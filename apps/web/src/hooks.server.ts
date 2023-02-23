import '$lib/sb';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event as any);

	event.locals.sb = supabaseClient;
	event.locals.session = session;

	return resolve(event);
};
