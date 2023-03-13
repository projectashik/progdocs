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
	try {
		config = await readConfig(repo);
		console.log(config);
	} catch (error) {
		console.log('Config Error');
	}
	return {
		content,
		config,
		docs: data?.data
	};
};
