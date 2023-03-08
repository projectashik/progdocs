<script lang="ts">
	import fm from 'front-matter';
	import rehypeSlug from 'rehype-slug';
	import remarkFrontmatter from 'remark-frontmatter';
	import remarkParse from 'remark-parse';
	import remarkToc from 'remark-toc';

	import rehypeAutolinkHeadings from 'rehype-autolink-headings';
	import emoji from 'remark-emoji';
	import remarkMdx from 'remark-mdx';
	import remarkRehype from 'remark-rehype';
	import type { Plugin } from 'svelte-exmarkdown';

	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import { parseToc } from '../lib/toc';

	import retextSentenceSpacing from '../lib/reader';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);

	const frontmatter = fm(data.content);

	const toc = parseToc(data.content);
	// console.log({ frontmatter, toc });
	console.log(toc);

	const plugin: Plugin[] = [
		{
			remarkPlugin: remarkParse
		},
		{
			remarkPlugin: emoji
		},
		{
			remarkPlugin: remarkMdx
		},
		{
			remarkPlugin: [remarkFrontmatter, ['yaml']]
		},
		{
			rehypePlugin: [remarkRehype, { allowDangerousHtml: true }]
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

	// console.log(gfmPlugin);
</script>

<div class="max-w-screen-xl grid gap-8 grid-cols-5 mx-auto py-10">
	<div>Sidebar</div>
	<div class="prose max-w-full col-span-3">
		<h1>{frontmatter.attributes.title || ''}</h1>
		<Markdown md={data.content} plugins={[gfmPlugin, ...plugin]} />
	</div>
	<div>
		<p>Table of Contents</p>
		<div class="prose max-w-full">
			<Markdown md={toc} plugins={[gfmPlugin, ...plugin]} />
		</div>
	</div>
</div>
