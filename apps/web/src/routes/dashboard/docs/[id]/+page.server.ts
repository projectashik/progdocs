import { readConfig } from '$lib/progdocs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	let { doc } = await parent();

	const repo = doc.github_url;

	let config;

	try {
		config = await readConfig(repo);
	} catch (error) {
		console.error(error);
	}

	return {
		doc: doc,
		config: config
	};
};
