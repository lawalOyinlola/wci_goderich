-- Security hardening for an existing database (2026-10-14).
-- schema.sql already contains all of this for fresh installs. Run this once in
-- the Supabase SQL editor BEFORE deploying the matching app code: the new
-- birthday replacement flow writes to pending_image, which must exist first.
-- Safe to re-run.

BEGIN;

-- 1. Birthday replacements wait for review instead of overwriting live rows.
ALTER TABLE birthdays ADD COLUMN IF NOT EXISTS pending_image TEXT;
ALTER TABLE birthdays ADD COLUMN IF NOT EXISTS pending_submitted_at TIMESTAMP WITH TIME ZONE;

CREATE OR REPLACE FUNCTION approve_birthday_replacement(birthday_id UUID)
RETURNS VOID AS $$
  UPDATE birthdays
  SET image = pending_image,
      year = EXTRACT(YEAR FROM pending_submitted_at)::INTEGER,
      verified = true,
      pending_image = NULL,
      pending_submitted_at = NULL
  WHERE id = birthday_id AND pending_image IS NOT NULL;
$$ LANGUAGE sql;

REVOKE EXECUTE ON FUNCTION approve_birthday_replacement(UUID) FROM PUBLIC, anon, authenticated;

-- 2. The public key reads approved rows only.
DROP POLICY IF EXISTS "Allow public read access on testimonies" ON testimonies;
CREATE POLICY "Allow public read access on testimonies"
  ON testimonies FOR SELECT
  USING (verified = true);

DROP POLICY IF EXISTS "Allow public read access on birthdays" ON birthdays;
CREATE POLICY "Allow public read access on birthdays"
  ON birthdays FOR SELECT
  USING (verified = true);

-- 3. ...and only the display columns of birthdays.
REVOKE SELECT ON birthdays FROM anon, authenticated;
GRANT SELECT (id, name, month, day, year, image, verified, featured, created_at, updated_at)
  ON birthdays TO anon, authenticated;

-- 4. No direct public inserts. The app writes through its API routes with the
--    service role, which bypasses RLS, so nothing on the site depends on these.
DROP POLICY IF EXISTS "Allow public insert on testimonies" ON testimonies;
DROP POLICY IF EXISTS "Allow public insert on birthdays" ON birthdays;
DROP POLICY IF EXISTS "Allow public insert on prayer_requests" ON prayer_requests;
DROP POLICY IF EXISTS "Allow public insert on prayer_group_members" ON prayer_group_members;

-- 5. Shared rate-limit counters, so limits hold across serverless instances
--    and survive cold starts. Keys are SHA-256 hashes (route + IP + window),
--    never raw IP addresses. No policies: only the service role touches it.
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  reset_at TIMESTAMP WITH TIME ZONE NOT NULL
);
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Atomically counts one request against `p_key` (or just reads the count
-- when p_consume is false) and returns the count and window end. Expired
-- rows are swept now and then so the table stays small.
CREATE OR REPLACE FUNCTION rate_limit_hit(p_key TEXT, p_window_ms INTEGER, p_consume BOOLEAN)
RETURNS TABLE (count INTEGER, reset_at TIMESTAMP WITH TIME ZONE) AS $$
#variable_conflict use_column
DECLARE
  step INTEGER := CASE WHEN p_consume THEN 1 ELSE 0 END;
BEGIN
  IF random() < 0.01 THEN
    DELETE FROM rate_limits r WHERE r.reset_at < now();
  END IF;

  RETURN QUERY
  INSERT INTO rate_limits AS r (key, count, reset_at)
  VALUES (p_key, step, now() + p_window_ms * INTERVAL '1 millisecond')
  ON CONFLICT (key) DO UPDATE SET
    count = CASE WHEN r.reset_at < now() THEN step ELSE r.count + step END,
    reset_at = CASE WHEN r.reset_at < now() THEN EXCLUDED.reset_at ELSE r.reset_at END
  RETURNING r.count, r.reset_at;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION rate_limit_hit(TEXT, INTEGER, BOOLEAN) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION rate_limit_hit(TEXT, INTEGER, BOOLEAN) TO service_role;

COMMIT;

-- Check afterwards: expect only "Allow public read access on ..." for the
-- public role, plus the service-role policies.
--   SELECT tablename, policyname, cmd, qual FROM pg_policies
--   WHERE schemaname = 'public' ORDER BY tablename, cmd;
