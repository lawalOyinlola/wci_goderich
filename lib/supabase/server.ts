import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Support both new (Secret) and legacy (service_role) key names
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// Support both new (Publishable) and legacy (anon) key names
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Lazily creates the admin (secret-key) Supabase client on first use.
 * Validation is deferred to call time so `next build` doesn't require
 * credentials just to evaluate modules.
 */
let _serverClient: SupabaseClient | null = null;
function getServerClient(): SupabaseClient {
  if (_serverClient) return _serverClient;

  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Please check your .env.local file."
    );
  }
  if (!supabaseSecretKey) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY for legacy). " +
        "Server-side Supabase client requires the secret key for admin operations. " +
        "Please check your .env.local file and ensure SUPABASE_SECRET_KEY is set."
    );
  }

  _serverClient = createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return _serverClient;
}

/**
 * Admin Supabase client. Backed by a lazy Proxy: the underlying client (and
 * its env validation) is created on first property access, not at import time.
 */
export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getServerClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
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
