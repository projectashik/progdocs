import { getSidebar } from '$lib/progdocs';
import { error, type Config } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const config: Config = {
	isr: {
		expiration: 60
	}
};

export const load: LayoutServerLoad = async (event) => {
	let sidebar: any;

	const { docs, config } = await event.parent();
	console.log({
		file: 'layout',
		docs,
		config
	});

	if (!docs) {
		throw error(404, {
			message: 'Site not found - docs'
		});
	}

	const repo = docs.github_url;
	try {
		sidebar = await getSidebar(repo);
		console.log(sidebar);
	} catch (err) {
		throw error(400, {
			message: 'Either configuration file(progdocs.json) not found or is invalid.'
		});
	}

	return {
		docs,
		config,
		sidebar
	};
};
