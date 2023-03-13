import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkToc from 'remark-toc';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import emoji from 'remark-emoji';
import remarkMdx from 'remark-mdx';
import type { Plugin } from 'svelte-exmarkdown';

import retextSentenceSpacing from './reader';

export const plugin: Plugin[] = [
	{
		remarkPlugin: remarkParse
	},
	{
		remarkPlugin: emoji
	},
	{
		remarkPlugin: remarkMdx as any
	},
	{
		remarkPlugin: [remarkFrontmatter, ['yaml']]
	},
	{
		remarkPlugin: remarkToc
	},
	{
		remarkPlugin: [remarkParse]
	},
	{
		rehypePlugin: rehypeSlug
	},
	{
		remarkPlugin: retextSentenceSpacing
	},
	{
		rehypePlugin: rehypeAutolinkHeadings
	}
];
