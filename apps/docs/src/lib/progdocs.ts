import * as matter from 'gray-matter';
import getFileContent from './getFile';

export const readConfig = async (repo: string) => {
	// @ts-ignore
	const content = await getFileContent(repo, 'progdocs.json');
	return JSON.parse(content);
};

export const getSidebar = async (repo: string) => {
	const config = await readConfig(repo);
	const sidebar = config.sidebar;
	// replace all the file names with the title frontmatter and the link with the file name
	const sidebarContent = sidebar.map(async (item: any) => {
		if (item.file) {
			console.log(item.file);
			const fileContent = await getFileContent(repo, `docs/${item.file}`);
			const frontmatter = matter.default(fileContent);
			console.log(frontmatter);
			return {
				title: frontmatter.data.title,
				// remove .md | .mdx from the link
				link: item.file.replace(/\.(md|mdx)$/, '')
			};
		} else {
			const links = item.children.map(async (child: any) => {
				console.log(child);
				const fileContent = await getFileContent(repo, `docs/${child}`);
				const frontmatter = matter.default(fileContent);
				console.log(frontmatter);
				return {
					title: frontmatter.data.title,
					link: child.replace(/\.(md|mdx)$/, '')
				};
			});
			return {
				title: item.title,
				children: await Promise.all(links)
			};
		}
	});

	return Promise.all(sidebarContent);
};
