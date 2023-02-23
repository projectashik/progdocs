import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { session } = event.locals;

	if (!session?.user) {
		return {
			redirect: '/auth/login'
		};
	}
};