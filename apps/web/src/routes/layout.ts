import { browser } from '$app/environment';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Load } from '@sveltejs/kit';
import { QueryClient } from '@tanstack/svelte-query';

export const load: Load = async (event) => {
	const { session } = await getSupabase(event);
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	return { session, queryClient };
};
