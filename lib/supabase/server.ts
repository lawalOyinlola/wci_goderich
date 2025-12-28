import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Support both new (Secret) and legacy (service_role) key names
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// Fallback to publishable key if secret key is not available (for client-side access level)
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL. Please check your .env.local file."
  );
}

// For server-side operations, use secret key if available (admin access)
// Otherwise use publishable key (client-side access level)
const supabaseKey = supabaseSecretKey || supabasePublishableKey;

if (!supabaseKey) {
  throw new Error(
    "Missing Supabase key. Please check your .env.local file. " +
    "You need SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY for legacy) for admin operations, " +
    "or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY for legacy) for client access."
  );
}

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

