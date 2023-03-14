<script lang="ts">
	import clsx from 'clsx';
	import type { LayoutServerData } from '../../$types';
	export let data: LayoutServerData;

	let menuOpen = false;
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
	<div class="bg-gray-100 z-10 lg:hidden sticky top-20">
		<div class="max-w-screen-xl  px-4 flex flex-col items-start lg:px-8 mx-auto py-4">
			<button
				on:click={() => {
					menuOpen = !menuOpen;
				}}
				class="w-full text-left flex items-center"
				><div
					class={clsx('transition-transform', {
						'rotate-90': menuOpen
					})}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6l-6-6z"
						/></svg
					>
				</div>
				Menu
			</button>
		</div>
		<div class="relative">
			<div
				class={clsx(
					'max-w-screen-xl  absolute w-full top-0 border-t bg-gray-100 shadow border-gray-400 px-4 flex flex-col items-start lg:px-8 mx-auto py-4',
					{
						hidden: !menuOpen
					}
				)}
			>
				<div class="prose lg:hidden block">
					{#if data.sidebar}
						{#each data.sidebar as item}
							<ul>
								{#if item.title}
									<li>
										{#if item.link}
											<a
												on:click={() => {
													menuOpen = false;
												}}
												href={`/${item.link}`}>{item.title}</a
											>
										{:else}
											{item.title}
										{/if}
									</li>
								{/if}
								{#if item.children}
									<ul>
										{#each item.children as child}
											<li>
												<a
													on:click={() => {
														menuOpen = false;
													}}
													href={`/${child.link}`}>{child.title}</a
												>
											</li>
										{/each}
									</ul>
								{/if}
							</ul>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="max-w-screen-xl px-4 lg:px-8 mx-auto  py-10">
		<div class="grid gap-8 grid-template-main grid-cols-5 ">
			<div class="prose lg:block hidden ">
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
			<slot />
		</div>

		<slot name="pagination" />
	</div>
</main>
