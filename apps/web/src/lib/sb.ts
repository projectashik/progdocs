import { env } from '$env/dynamic/public';
import { createClient, type TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';

export const sb: TypedSupabaseClient = createClient(
  env.PUBLIC_SUPABASE_URL,
  env.PUBLIC_SUPABASE_ANON_KEY
);
