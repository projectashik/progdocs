import { getUser } from '$lib/getUser';
import { readConfig } from '$lib/progdocs';
import getFileContent from '../lib/getFile';
import { sb } from '../lib/sb';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 60
	}
};

export const load: PageServerLoad = async (event) => {
	// console.log(event);
	let subdomain;
	let domain;
	let data;
	if (event.url.host.includes('.')) {
		subdomain = event.url.host.split('.')[0];
	} else {
		domain = event.url.host;
	}
	if (subdomain) {
		data = await sb.from('docs').select('*').eq('subdomain', subdomain).single();
		console.log(data);
	}

	const repo = data?.data.github_url;

	const content = await getFileContent(repo, 'docs/index.md');

	let config;
	let landingContent;
	let developers;
	let previousPage;
	let nextPage;

	try {
		config = await readConfig(repo);
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
		docs: data?.data,
		landingContent
	};
};
