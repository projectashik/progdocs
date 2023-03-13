import getFileContent from '$lib/getFile';
import { sb } from '$lib/sb';
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

	const { file } = event.params;
	console.log(file);
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
	// const octokit = new Octokit({
	// 	auth: env.GITHUB_TOKEN
	// });
	// // const { data } = await octokit.rest.repos.getContent({
	// // 	owner: repo.split('/')[0],
	// // 	repo: repo.split('/')[1],
	// // 	path: 'docs/index.md'
	// // });
	const content = await getFileContent(repo, `docs/${file}.md`);
	console.log('Page Content: ', content);
	// let config;
	// try {
	// 	config = await readConfig(repo);
	// 	console.log(config);
	// } catch (error) {
	// 	console.log('Config Error');
	// }
	return {
		content,
		config,
		docs: data?.data
	};
};
