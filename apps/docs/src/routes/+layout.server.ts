import { env } from '$env/dynamic/private';
import { Octokit } from 'octokit';
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
	const octokit = new Octokit({
		auth: env.GITHUB_TOKEN
	});
	// const { data } = await octokit.rest.repos.getContent({
	// 	owner: repo.split('/')[0],
	// 	repo: repo.split('/')[1],
	// 	path: 'docs/index.md'
	// });
	const content = await getFileContent(repo, 'index.md');
	return {
		content,
		docs: data?.data
	};
};
