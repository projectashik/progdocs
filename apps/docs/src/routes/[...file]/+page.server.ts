import getFileContent from '$lib/getFile';
import { parseToc } from '$lib/toc';
import { error } from '@sveltejs/kit';
import fm from 'front-matter';
import type { PageServerLoad } from '../$types';

// export const config: Config = {
// 	isr: {
// 		expiration: 60
// 	}
// };

export const load: PageServerLoad = async ({ parent, params }) => {
	let content;
	let nextPage: any;
	let prevPage: any;

	const { docs, config, sidebar } = await parent();

	let { file }: { file: any } = params;

	const repo = docs.github_url;

	try {
		content = await getFileContent(repo, `docs/${file}.md`);
	} catch (err) {
		console.log(err);
		throw error(404, {
			message: 'Page not found'
		});
	}

	sidebar?.map((item: any) => {
		if (item.children) {
			item.children.map((child: any) => {
				if (child.link === file) {
					const index = item.children.indexOf(child);
					if (index === 0) {
						nextPage = item.children[index + 1];
					} else if (index === item.children.length - 1) {
						prevPage = item.children[index - 1];
					} else {
						nextPage = item.children[index + 1];
						prevPage = item.children[index - 1];
					}

					if (!prevPage) {
						prevPage = sidebar[sidebar.indexOf(item) - 1];
					}

					if (!nextPage) {
						nextPage = sidebar[sidebar.indexOf(item) + 1];
					}
				}
			});
		} else {
			if (item.link === file) {
				const index = sidebar.indexOf(item);

				if (index === 0) {
					nextPage = sidebar[index + 1];
				} else if (index === sidebar.length - 1) {
					prevPage = sidebar[index - 1];
				} else {
					nextPage = sidebar[index + 1];
					prevPage = sidebar[index - 1];
				}

				if (nextPage && nextPage.children) nextPage = nextPage.children[0];
				if (prevPage && prevPage.children)
					prevPage = prevPage.children[prevPage.children.length - 1];
			}
		}
	});

	const toc = parseToc(content);
	const frontmatter = fm(content);

	return {
		content,
		toc,
		frontmatter,
		next: nextPage,
		prev: prevPage,
		config,
		docs
	};
};
