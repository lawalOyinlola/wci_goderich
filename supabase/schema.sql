-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Testimonies Table
CREATE TABLE IF NOT EXISTS testimonies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL, -- Cloudinary URL
  testimony TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('written', 'video', 'audio')),
  video_url TEXT, -- Only for video type
  audio_url TEXT, -- Only for audio type
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for testimonies
CREATE INDEX IF NOT EXISTS idx_testimonies_type ON testimonies(type);
CREATE INDEX IF NOT EXISTS idx_testimonies_featured ON testimonies(featured);
CREATE INDEX IF NOT EXISTS idx_testimonies_date ON testimonies(date DESC);
CREATE INDEX IF NOT EXISTS idx_testimonies_category ON testimonies(category);
CREATE INDEX IF NOT EXISTS idx_testimonies_verified ON testimonies(verified);

-- Function to validate date (handles month-specific day limits and leap years)
CREATE OR REPLACE FUNCTION is_valid_date(month_val INTEGER, day_val INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  test_date DATE;
BEGIN
  -- Validate month range
  IF month_val < 1 OR month_val > 12 THEN
    RETURN FALSE;
  END IF;
  
  -- Validate day range
  IF day_val < 1 OR day_val > 31 THEN
    RETURN FALSE;
  END IF;
  
  -- Use PostgreSQL's date validation to check if the date is valid
  -- Try with a non-leap year first (2001), then a leap year (2000) for February 29
  BEGIN
    -- For February, check both non-leap and leap year
    IF month_val = 2 AND day_val = 29 THEN
      test_date := make_date(2000, month_val, day_val); -- 2000 is a leap year
    ELSE
      test_date := make_date(2001, month_val, day_val); -- 2001 is not a leap year
    END IF;
    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      RETURN FALSE;
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Birthdays Table
-- `year` tracks the calendar year a row's name/image was last submitted or
-- approved. It is not part of the row's identity (name, month, day) still
-- uniquely identifies a celebrant, so a resubmission updates the same row
-- rather than creating a duplicate that would show twice in the birthday
-- grid. The API assigns it server-side from the current year; it is never
-- accepted from the client.
CREATE TABLE IF NOT EXISTS birthdays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  day INTEGER NOT NULL CHECK (is_valid_date(month, day)),
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW())::INTEGER,
  image TEXT NOT NULL, -- Cloudinary URL
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migration for a birthdays table created before the `year` column existed.
-- No-ops against a table that already has it (including one just created
-- above). Safe to re-run.
ALTER TABLE birthdays ADD COLUMN IF NOT EXISTS year INTEGER;
UPDATE birthdays SET year = EXTRACT(YEAR FROM created_at)::INTEGER WHERE year IS NULL;
ALTER TABLE birthdays ALTER COLUMN year SET NOT NULL;
ALTER TABLE birthdays ALTER COLUMN year SET DEFAULT EXTRACT(YEAR FROM NOW())::INTEGER;

-- Replacement photos wait here for review. A visitor resubmitting a name and
-- date that's already on file can't prove they're the original submitter, so
-- the API never overwrites `image` or `verified` directly: it stores the new
-- photo in pending_image and an admin applies it with
-- approve_birthday_replacement() below. Never selected by public reads.
ALTER TABLE birthdays ADD COLUMN IF NOT EXISTS pending_image TEXT;
ALTER TABLE birthdays ADD COLUMN IF NOT EXISTS pending_submitted_at TIMESTAMP WITH TIME ZONE;

-- Admin action: swap a row's photo for its pending replacement and approve it.
--   SELECT approve_birthday_replacement('<birthday id>');
-- The previous photo stays in Cloudinary; delete it there once you're happy.
-- To reject a replacement instead, set pending_image and pending_submitted_at
-- back to NULL.
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

-- Supabase exposes functions over its public API by default; this one is for
-- admins in the SQL editor only.
REVOKE EXECUTE ON FUNCTION approve_birthday_replacement(UUID) FROM PUBLIC, anon, authenticated;

-- Case-insensitive identity: the app looks up an existing row with
-- `.ilike("name", ...)` (see findExistingBirthday in app/api/birthdays/route.ts),
-- so the uniqueness constraint has to match on the same terms - a plain
-- UNIQUE(name, month, day) would let "John Doe" and "JOHN DOE" coexist as two
-- rows for the same identity, which the app's own case-insensitive lookup
-- would then treat as one (and .maybeSingle() would error on the ambiguity).
-- Drop the old case-sensitive constraint (only present on a table created
-- before this migration existed) and replace it with an expression index.
ALTER TABLE birthdays DROP CONSTRAINT IF EXISTS unique_birthday;
CREATE UNIQUE INDEX IF NOT EXISTS unique_birthday_ci
  ON birthdays (lower(name), month, day);

-- Indexes for birthdays
CREATE INDEX IF NOT EXISTS idx_birthdays_month ON birthdays(month);
CREATE INDEX IF NOT EXISTS idx_birthdays_month_day ON birthdays(month, day);
CREATE INDEX IF NOT EXISTS idx_birthdays_year ON birthdays(year);
CREATE INDEX IF NOT EXISTS idx_birthdays_verified ON birthdays(verified);
CREATE INDEX IF NOT EXISTS idx_birthdays_featured ON birthdays(featured);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_testimonies_updated_at 
  BEFORE UPDATE ON testimonies 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_birthdays_updated_at 
  BEFORE UPDATE ON birthdays 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE birthdays ENABLE ROW LEVEL SECURITY;

-- Policies: the public (publishable/anon key) can read approved rows only.
-- All writes go through the app's API routes, which use the service role and
-- enforce CAPTCHA, rate limits and validation. There are deliberately no
-- public INSERT policies: the publishable key ships to every browser, so a
-- public insert policy let anyone skip all of that and write rows (including
-- verified = true) straight into the table.

-- Testimonies: public read of approved rows, everything else service role
CREATE POLICY "Allow public read access on testimonies"
  ON testimonies FOR SELECT
  USING (verified = true);

CREATE POLICY "Allow service role update on testimonies"
  ON testimonies FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role'); -- Only service role can update (e.g., to verify)

CREATE POLICY "Allow service role delete on testimonies"
  ON testimonies FOR DELETE
  USING (auth.role() = 'service_role'); -- Only service role can delete

-- Birthdays: public read of approved rows, everything else service role.
-- Column grants (further down) also hide pending_image from the public key.
CREATE POLICY "Allow public read access on birthdays"
  ON birthdays FOR SELECT
  USING (verified = true);

CREATE POLICY "Allow service role update on birthdays"
  ON birthdays FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role'); -- Only service role can update (e.g., to verify)

CREATE POLICY "Allow service role delete on birthdays"
  ON birthdays FOR DELETE
  USING (auth.role() = 'service_role'); -- Only service role can delete

-- RLS filters rows, not columns. Even on an approved row, pending_image holds
-- an unreviewed photo, so the public key may only read the display columns.
REVOKE SELECT ON birthdays FROM anon, authenticated;
GRANT SELECT (id, name, month, day, year, image, verified, featured, created_at, updated_at)
  ON birthdays TO anon, authenticated;

-- Prayer Requests Table
CREATE TABLE IF NOT EXISTS prayer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  category TEXT NOT NULL,
  request TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'praying', 'answered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prayer Group Members Table
CREATE TABLE IF NOT EXISTS prayer_group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  prayer_group_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  previous_experience TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for prayer tables
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_category ON prayer_requests(category);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_group_members_status ON prayer_group_members(status);
CREATE INDEX IF NOT EXISTS idx_prayer_group_members_group_id ON prayer_group_members(prayer_group_id);
CREATE INDEX IF NOT EXISTS idx_prayer_group_members_created_at ON prayer_group_members(created_at DESC);

-- Triggers to automatically update updated_at for prayer tables
CREATE TRIGGER update_prayer_requests_updated_at 
  BEFORE UPDATE ON prayer_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prayer_group_members_updated_at 
  BEFORE UPDATE ON prayer_group_members 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for prayer tables
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_group_members ENABLE ROW LEVEL SECURITY;


-- Policies for prayer_requests: service role only (PII protection). Submissions go through /api/prayer/requests.
-- Public reads are restricted to prevent PII exposure (email, phone, and name when is_anonymous=true)
-- The API endpoint uses service_role and sanitizes data before returning
CREATE POLICY "Allow service role read on prayer_requests"
  ON prayer_requests FOR SELECT
  -- USING (true);
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role update on prayer_requests"
  ON prayer_requests FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role delete on prayer_requests"
  ON prayer_requests FOR DELETE
  USING (auth.role() = 'service_role');

-- Policies for prayer_group_members: service role only (the join form posts
-- through /api/prayer/groups/join, which uses the service role)
CREATE POLICY "Allow service role read on prayer_group_members"
  ON prayer_group_members FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role update on prayer_group_members"
  ON prayer_group_members FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role delete on prayer_group_members"
  ON prayer_group_members FOR DELETE
  USING (auth.role() = 'service_role');

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL, -- Cloudinary URL
  alt_text TEXT NOT NULL,
  orientation TEXT NOT NULL CHECK (orientation IN ('portrait', 'landscape', 'square')),
  category TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for gallery
CREATE INDEX IF NOT EXISTS idx_gallery_orientation ON gallery(orientation);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery(display_order DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);

-- Trigger to automatically update updated_at for gallery
CREATE TRIGGER update_gallery_updated_at 
  BEFORE UPDATE ON gallery 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policies for gallery: Allow public read, restrict insert/update/delete to service role
CREATE POLICY "Allow public read access on gallery"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Allow service role insert on gallery"
  ON gallery FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role update on gallery"
  ON gallery FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role delete on gallery"
  ON gallery FOR DELETE
  USING (auth.role() = 'service_role');

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for contact_messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_subject ON contact_messages(subject);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Trigger to automatically update updated_at for contact_messages
CREATE TRIGGER update_contact_messages_updated_at 
  BEFORE UPDATE ON contact_messages 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for contact_messages: service role only (PII protection). Submissions go through /api/contact.
CREATE POLICY "Allow service role read on contact_messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role insert on contact_messages" 
  ON contact_messages FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role update on contact_messages"
  ON contact_messages FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role delete on contact_messages"
  ON contact_messages FOR DELETE
  USING (auth.role() = 'service_role');

-- Rate Limits Table
-- Shared rate-limit counters, so limits hold across serverless instances
-- and survive cold starts. Keys are SHA-256 hashes (route + IP + window),
-- never raw IP addresses. No policies: only the service role touches it.
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
