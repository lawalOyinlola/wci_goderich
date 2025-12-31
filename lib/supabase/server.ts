import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Support both new (Secret) and legacy (service_role) key names
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// Support both new (Publishable) and legacy (anon) key names
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

if (!supabasePublishableKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY for legacy). " +
      "Please check your .env.local file."
  );
}

const supabaseKey = supabaseSecretKey;

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Creates a Supabase client using the anon/publishable key.
 * This respects RLS policies and can be used for public operations.
 * For authenticated operations, the client will use the user's session from cookies.
 */
export function createAnonClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Missing Supabase environment variables for anon client. " +
        "Please check your .env.local file."
    );
  }

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
