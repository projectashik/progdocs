<script lang="ts">
	import { plugin } from '$lib/plugins';
	import { parseToc } from '$lib/toc';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import type { LayoutServerData } from '../../$types';

	export let data: LayoutServerData;
	const toc = parseToc(data.content || '');

	// console.log(data);
</script>

<main>
	<!-- <section id="hero" class="bg-gray-200">
		<div class="max-w-screen-xl mx-auto py-16 flex items-center">
			<div class="flex flex-col h-full w-full">
				<h1 class="text-7xl font-bold text-center ">{data.docs.title}</h1>
				<p class="text-xl text-center max-w-lg mx-auto mt-4">{data.docs.description || ''}</p>

				<div class="flex justify-center mt-4">
					<a href={`https://github.com/${data.docs.github_url}`} target="_blank " class="btn"
						>Github</a
					>
				</div>
			</div>
		</div>
	</section> -->
	<div class="max-w-screen-xl grid gap-8 grid-cols-5 mx-auto py-10">
		<div class="prose">
			<!-- <pre>
				{JSON.stringify(data.sidebar, null, 2)}

			</pre> -->
			<!-- {data.config && data.config.sidebar && data.config.sidebar.map((item) => {
				return <div>{item.title || ""}</div>
			})} -->
			{#if data.sidebar}
				{#each data.sidebar as item}
					<ul>
						{#if item.title}
							<li>
								{#if item.link}
									<a href={`/${item.link}`}>{item.title}</a>
								{:else}
									{item.title}
								{/if}
							</li>
						{/if}
						{#if item.children}
							<ul>
								{#each item.children as child}
									<li>
										<a href={`/${child.link}`}>{child.title}</a>
									</li>
								{/each}
							</ul>
						{/if}
					</ul>
				{/each}
			{/if}
		</div>
		<div class="prose max-w-full col-span-3">
			<slot />
		</div>
		<div>
			<p>Table of Contents</p>
			<div class="prose max-w-full">
				<Markdown md={toc} plugins={[gfmPlugin, ...plugin]} />
			</div>
		</div>
	</div>
</main>
