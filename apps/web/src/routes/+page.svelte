<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { sb } from '$lib/sb';

	const onLogout = async () => {
		console.log('Done');
		const { error } = await sb.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

	const features = [
		{
			title: 'Auto Updating',
			implemented: true,
			description: 'Your app will automatically update when you deploy new changes on GitHub.'
		},
		{
			title: 'GitHub - Content Source',
			implemented: true,
			description:
				"All the content for your app is stored in your GitHub repository. You don't need to worry about hosting your content."
		},
		{
			title: 'Free',
			implemented: true,
			description: 'You can use this app for free. You can also use it to build your own app.'
		},
		{
			title: 'Open Source',
			implemented: true,
			description:
				'You can view the source code for this app on GitHub. You can also use it to build your own app.'
		},
		{
			title: 'Custom Domain',
			implemented: false,
			description:
				'You can use your own domain name for your app. You can also use it to build your own app.'
		},
		{
			title: 'Analytics',
			implemented: false,
			description:
				'Realtime analytics for your app. Details like page views, devices, country, etc.'
		}
	];
</script>

<Header />

<div
	class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
>
	<div class="max-w-xl sm:mx-auto lg:max-w-2xl">
		<div class="flex flex-col mb-16 sm:text-center sm:mb-0">
			<a href="/" class="mb-6 sm:mx-auto">
				<div class="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
					<svg class="w-10 h-10 text-primary-500" stroke="currentColor" viewBox="0 0 52 52">
						<polygon
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
							fill="none"
							points="29 13 14 29 25 29 23 39 38 23 27 23"
						/>
					</svg>
				</div>
			</a>
			<div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
				<h2
					class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
				>
					<span class="relative inline-block">
						<svg
							viewBox="0 0 52 24"
							fill="currentColor"
							class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
						>
							<defs>
								<pattern
									id="e77df901-b9d7-4b9b-822e-16b2d410795b"
									x="0"
									y="0"
									width=".135"
									height=".30"
								>
									<circle cx="1" cy="1" r=".7" />
								</pattern>
							</defs>
							<rect fill="url(#e77df901-b9d7-4b9b-822e-16b2d410795b)" width="52" height="24" />
						</svg>
						<span class="relative">Convert</span>
					</span>
					your boring markdown files into beautiful docs
				</h2>
				<p class="text-base text-gray-700 md:text-lg">
					Transform your markdown files into stunning documentation with Progdocs. Create beautiful
					and engaging docs with our powerful features and user-friendly interface.
				</p>
			</div>
			<div>
				<a
					href="/auth/login"
					class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-primary-700 focus:shadow-outline focus:outline-none"
				>
					Get started
				</a>
			</div>
		</div>
	</div>
</div>

<div
	class="bg-gray-50 rounded  border px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
>
	<div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
		<div>
			<p
				class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-primary-900 uppercase rounded-full bg-primary-100"
			>
				Features
			</p>
		</div>
		<h2
			class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
		>
			Create stunning documentation with Progdocs
		</h2>
	</div>
	<div class="grid gap-4 row-gap-5 sm:grid-cols-1 lg:grid-cols-3">
		{#each features as feature}
			<div class="flex bg-white flex-col justify-between p-5 border rounded shadow-sm">
				<div>
					<div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
						<svg class="w-12 h-12 text-primary-500" stroke="currentColor" viewBox="0 0 52 52">
							<polygon
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								fill="none"
								points="29 13 14 29 25 29 23 39 38 23 27 23"
							/>
						</svg>
					</div>
					<!-- badge of coming soon if implemented: false -->
					{#if !feature.implemented}
						<span
							class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-red-800"
						>
							Coming soon
						</span>
					{/if}
					<h6 class="mb-2 font-semibold leading-5">{feature.title}</h6>
					<p class="mb-3 text-sm text-gray-900">
						{feature.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
