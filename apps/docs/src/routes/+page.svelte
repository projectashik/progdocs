<script lang="ts">
	import Markdown from 'svelte-exmarkdown';

	// console.log(gfmPlugin);
	export let data;

	console.log(data);
</script>

<main>
	<section id="hero" class="">
		<div class="max-w-screen-xl px-4 mx-auto py-28 flex items-center">
			<div class="flex flex-col h-full w-full">
				<h1 class="text-4xl max-w-2xl font-bold ">
					{data.docs.description || data.config.description}
				</h1>

				<p class="text-xl mt-4">
					<!-- {(data.config && data.config.description) || data.docs.description} -->
				</p>
				<div class="flex mt-4 gap-3">
					<a href={`https://github.com/${data.docs.github_url}`} target="_blank " class="btn"
						>Github</a
					>
					<a
						href={`/${(
							(data.config && data.config.indexDoc && data.config.indexDoc) ||
							'getting-started.md'
						).replace('.md', '')}`}
						class="btn btn-ghost">Get Started</a
					>
				</div>
			</div>
		</div>
	</section>
</main>

{#if data.landingContent}
	<div class="max-w-screen-xl px-4 mx-auto mt-10">
		<div class="prose  prose-lg max-w-5xl">
			<Markdown md={data.landingContent} />
		</div>
	</div>
{/if}

{#if data.developers}
	<div class="bg-gray-100">
		<div class="max-w-screen-xl px-4 py-10 mx-auto">
			<h2 class="font-bold text-2xl">Developed By</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
				{#each data.developers as author}
					<div class="bg-white flex flex-col items-center p-9 rounded-md">
						<img src={author.avatar} alt={author} class="w-40 h-40 rounded-full" />

						<p class="my-2 font-semibold text-xl">{author.name}</p>
						<p class="text-center">{author.bio}</p>

						<div class="mt-4 flex gap-2 items-center">
							{#if author.gh}
								<a href={`https://github.com/${author.gh}`}>
									<img src="https://github.com/favicon.ico" width="23" height="23" alt="GitHub" />
								</a>
							{/if}
							{#if author.twitter}
								<a href={`https://twitter.com/${author.twitter}`}>
									<img src="https://twitter.com/favicon.ico" width="23" height="23" alt="Twitter" />
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<div />
