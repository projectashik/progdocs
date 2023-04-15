import { DOCS_URL } from '$env/static/private';
import { readConfig } from '$lib/progdocs';
import { sb } from '$lib/sb';
import type { Config } from '@sveltejs/adapter-vercel';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const config: Config = {
	runtime: 'nodejs18.x'
};

export const load: LayoutServerLoad = async (event) => {
	let subdomain;
	let domain;
	let data;
	let config;

	const docsUrl = process.env.NODE_ENV === 'production' ? DOCS_URL : 'localhost:3001';

	if (event.url.host.includes(docsUrl)) {
		if (event.url.host.includes('.')) {
			subdomain = event.url.host.split('.')[0];
		}
	} else {
		domain = event.url.host;
	}

	if (subdomain) {
		try {
			data = await sb.from('docs').select('*').eq('subdomain', subdomain).single();
		} catch (err) {
			throw error(404, {
				message: 'Site not found- subdomain error'
			});
		}
	} else {
		throw error(404, {
			message: 'Site not found -  subdomain else'
		});
	}

	if (!data.data) {
		throw error(404, {
			message: 'Site not found -  data'
		});
	}

	try {
		config = await readConfig(data.data.github_url);
	} catch (err) {
		throw error(400, {
			message: 'Either configuration file(progdocs.json) not found or is invalid.'
		});
	}

	return {
		docs: data?.data,
		config
	};
};
