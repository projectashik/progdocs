<script lang="ts">
	import { plugin } from '$lib/plugins';
	import { parseToc } from '$lib/toc';

	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';

	import type { PageData } from './$types';

	export let data: PageData;
	// console.log(data);

	const toc = parseToc(data.content);
	// console.log({ frontmatter, toc });
	// console.log(toc);

	// console.log(gfmPlugin);
</script>

<svelte:head>
	<title>{`${data.frontmatter.attributes.title} - ${data.docs.title}`}</title>
	<meta name="description" content={data.frontmatter.attributes.description} />
</svelte:head>

<div class="prose max-w-full px-3 border-b pb-5">
	<h1>{data.frontmatter.attributes.title || ''}</h1>
	<Markdown md={data.content} plugins={[gfmPlugin, ...plugin]} />

	<!-- Pagination -->
	<div class="grid grid-cols-2 pt-4 mt-10 items-center">
		{#if data.prev}
			<a href={`/${data.prev.link}`} class="btn btn-sm btn-ghost  justify-self-start text-gray-700">
				← {data.prev.title}
			</a>
		{:else}
			<div />
		{/if}

		{#if data.next}
			<a href={`/${data.next.link}`} class="btn btn-sm btn-ghost justify-self-end text-gray-700">
				{data.next.title} →
			</a>
		{:else}
			<div />
		{/if}
	</div>
</div>
<div class="hidden xl:block">
	<p>On this page</p>
	<div class="prose max-w-full h-full ">
		<Markdown md={parseToc(data.content)} plugins={[gfmPlugin, ...plugin]} />
	</div>
</div>
