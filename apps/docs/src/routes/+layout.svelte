<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	export let data: PageData;

	// console.log(data);
</script>

<header class="shadow border-b  h-16">
	<div class="max-w-screen-xl mx-auto h-full flex items-center">
		<a href="/" class="text-xl btn glass text-gray-700">{data.docs.title}</a>
	</div>
</header>

<main>
	<section id="hero" class="bg-gray-200">
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
	</section>
</main>
<slot />
