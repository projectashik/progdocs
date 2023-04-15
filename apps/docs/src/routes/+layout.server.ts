import { getSidebar, readConfig } from '$lib/progdocs';
import { error, type Config } from '@sveltejs/kit';
import { sb } from '../lib/sb';
import type { LayoutServerLoad } from './$types';

export const config: Config = {
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
		try {
			data = await sb.from('docs').select('*').eq('subdomain', subdomain).single();
		} catch (err) {
			throw error(404, {
				message: 'Site not found - subdomain'
			});
		}
		// console.log('Layout', data);
	} else {
		throw error(404, {
			message: 'Site not found - !domain'
		});
	}

	if (!data) {
		throw error(404, {
			message: 'Site not found - !data'
		});
	}

	const repo = data?.data.github_url;
	// console.log(data);
	let config;
	let sidebar;

	try {
		// config = await readConfig(repo);
		sidebar = await getSidebar(repo);
		console.log(sidebar);
	} catch (error) {
		console.log('Config Error');
	}

	try {
		config = await readConfig(repo);
	} catch (error) {
		console.log('Config Error');
	}
	return {
		// content,
		sidebar,
		docs: data?.data,
		config
	};
};
