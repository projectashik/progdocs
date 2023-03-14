import getFileContent from '$lib/getFile';
import { sb } from '$lib/sb';
import { parseToc } from '$lib/toc';
import fm from 'front-matter';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 4
	}
};

export const load: PageServerLoad = async (event) => {
	const parentData = event.parent();
	let subdomain;
	let domain;
	let data;

	const { file } = event.params;
	// console.log(file);
	if (event.url.host.includes('.')) {
		subdomain = event.url.host.split('.')[0];
	} else {
		domain = event.url.host;
	}
	if (subdomain) {
		data = await sb.from('docs').select('*').eq('subdomain', subdomain).single();
		// console.log(data);
	}

	const repo = data?.data.github_url;

	const content = await getFileContent(repo, `docs/${file}.md`);
	const sidebar = (await parentData).sidebar;

	// console.log({ sidebar, mainIndex });
	let next: any, prev: any;
	// the sidebar structure is [{title, link, children: [{title, link}]}]
	// console.log(sidebar?.[index]);
	sidebar?.map((item) => {
		if (item.children) {
			item.children.map((child: any) => {
				if (child.link === file) {
					const index = item.children.indexOf(child);
					if (index === 0) {
						next = item.children[index + 1];
					} else if (index === item.children.length - 1) {
						prev = item.children[index - 1];
					} else {
						next = item.children[index + 1];
						prev = item.children[index - 1];
					}

					if (!prev) {
						prev = sidebar[sidebar.indexOf(item) - 1];
					}

					if (!next) {
						next = sidebar[sidebar.indexOf(item) + 1];
					}
				}
			});
		} else {
			if (item.link === file) {
				const index = sidebar.indexOf(item);

				if (index === 0) {
					next = sidebar[index + 1];
				} else if (index === sidebar.length - 1) {
					prev = sidebar[index - 1];
				} else {
					next = sidebar[index + 1];
					prev = sidebar[index - 1];
				}

				if (next && next.children) next = next.children[0];
				if (prev && prev.children) prev = prev.children[prev.children.length - 1];
			}
		}
	});

	const frontmatter = fm(content);
	const toc = parseToc(content);
	// console.log('Page Content: ', content);
	return {
		content,
		toc,
		frontmatter: frontmatter,
		config,
		docs: data?.data,
		next,
		prev
	};
};
