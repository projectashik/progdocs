<script lang="ts">
	import { plugin } from '$lib/plugins';
	import fm from 'front-matter';

	import { parseToc } from '$lib/toc';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';

	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);

	const frontmatter = fm(data.content);

	const toc = parseToc(data.content);
	// console.log({ frontmatter, toc });
	// console.log(toc);

	// console.log(gfmPlugin);
</script>

<div>
	<h1>{frontmatter.attributes.title || ''}</h1>
	<Markdown md={data.content} plugins={[gfmPlugin, ...plugin]} />
</div>
