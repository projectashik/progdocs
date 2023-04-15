import { getUser } from '$lib/getUser';
import getFileContent from '../lib/getFile';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 60
	}
};

export const load: PageServerLoad = async (event) => {
	const { docs, sidebar, config } = await event.parent();

	const repo = docs.github_url;

	const content = await getFileContent(repo, 'docs/index.md');

	let landingContent;
	let developers;
	let previousPage;
	let nextPage;

	try {
		landingContent = config.landingMarkdown
			? await getFileContent(repo, `docs/${config?.landingMarkdown}`)
			: '';
		if (config.developers) {
			developers = Promise.all(
				await config.developers.map(async (developer: any) => {
					if (typeof developer === 'string') {
						let user = await getUser(developer);

						return {
							name: user.data.name,
							gh: user.data.login,
							bio: user.data.bio,
							twitter: user.data.twitter_username,
							avatar: user.data.avatar_url
						};
					} else {
						return developer;
					}
				})
			);
		}
	} catch (error) {
		console.log('Config Error');
	}

	return {
		content,
		config,
		developers,
		docs,
		landingContent
	};
};
