<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);

	// console.log(gfmPlugin);
</script>

<svelte:head>
	<title>{`${data.docs.title}`}</title>
</svelte:head>

<main>
	<section id="hero" class="bg-gray-200">
		<div class="max-w-screen-xl mx-auto py-16 flex items-center">
			<div class="flex flex-col h-full w-full">
				<h1 class="text-7xl font-bold text-center ">{data.docs.title}</h1>
				<p class="text-xl text-center max-w-lg mx-auto mt-4" />
				<div class="flex justify-center mt-4 gap-3">
					<a href={`https://github.com/${data.docs.github_url}`} target="_blank " class="btn"
						>Github</a
					>
					<a
						href={`/${(data.config.indexDoc || 'getting-started.md').replace('.md', '')}`}
						class="btn btn-ghost">Get Started</a
					>
				</div>
			</div>
		</div>
	</section>
</main>

<div />
