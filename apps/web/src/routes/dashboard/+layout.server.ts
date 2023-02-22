import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event as any);

	if (session && session.user) {
		return {
			session
		};
	} else {
		throw redirect(307, '/auth/login');
	}
};
