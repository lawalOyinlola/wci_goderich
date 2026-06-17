import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Support both new (Publishable) and legacy (anon) key names
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Lazily creates the browser/publishable Supabase client on first use, so
 * `next build` can evaluate this module without credentials present.
 */
let _client: SupabaseClient | null = null;
function getClient(): SupabaseClient {
  if (_client) return _client;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file. " +
        "You need NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY for legacy)."
    );
  }

  _client = createClient(supabaseUrl, supabasePublishableKey);
  return _client;
}

/**
 * Public Supabase client. Backed by a lazy Proxy: the underlying client (and
 * its env validation) is created on first property access, not at import time.
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
