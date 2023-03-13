import { env } from '$env/dynamic/private';
import { getSidebar } from '$lib/progdocs';
import { Octokit } from 'octokit';
import type { LayoutServerLoad } from '../$types';
import { sb } from '../../lib/sb';

export const config = {
	isr: {
		expiration: 60
	}
};

export const load: LayoutServerLoad = async (event) => {
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
		console.log('Layout', data);
	}

	const repo = data?.data.github_url;
	// console.log(data);
	const octokit = new Octokit({
		auth: env.GITHUB_TOKEN
	});
	// const { data } = await octokit.rest.repos.getContent({
	// 	owner: repo.split('/')[0],
	// 	repo: repo.split('/')[1],
	// 	path: 'docs/index.md'
	// });
	// const content = await getFileContent(repo, 'docs/index.md');
	let config;
	let sidebar;
	try {
		// config = await readConfig(repo);
		sidebar = await getSidebar(repo);
		console.log(sidebar);
	} catch (error) {
		console.log('Config Error');
	}
	return {
		// content,
		sidebar,
		docs: data?.data
	};
};
