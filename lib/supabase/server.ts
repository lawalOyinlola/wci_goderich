import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Support both new (Secret) and legacy (service_role) key names
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL. Please check your .env.local file."
  );
}

// Server-side operations require the secret key for admin access
if (!supabaseSecretKey) {
  throw new Error(
    "Missing SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY for legacy). " +
      "Server-side Supabase client requires the secret key for admin operations. " +
      "Please check your .env.local file and ensure SUPABASE_SECRET_KEY is set."
  );
}

const supabaseKey = supabaseSecretKey;

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
