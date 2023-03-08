import { marked } from 'marked';
export const parseToc = (md: string) => {
	const toc: { level: number; text: string; slug: string }[] = [];

	// skip frontmatter
	const frontmatter = md.match(/^---\n([\s\S]+?)\n---/);

	if (frontmatter) {
		md = md.replace(frontmatter[0], '');
	}

	const renderer = new marked.Renderer();

	renderer.heading = (text, level, raw, slugger) => {
		const slug = slugger.slug(raw);
		toc.push({ level, text, slug });
		return text;
	};

	marked(md, { renderer });

	return toc.map((t) => `${Array(t.level).join('  ')}- [${t.text}](#${t.slug})`).join('\n\n');
};
