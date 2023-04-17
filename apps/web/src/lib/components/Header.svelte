<script>
	import clsx from 'clsx';
	import { Logo } from 'ui';
	import { sessionStore } from '../../stores/authStore';

	let isOpen = false;

	const toggleMenu = () => {
		isOpen = !isOpen;
	};

	const links = [
		{
			name: 'Features',
			href: '#features'
		},
		{
			name: 'Docs',
			href: 'https://docs.progdocs.tech'
		}
	];

	let data = sessionStore;
</script>

<div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
	<div class="relative flex items-center justify-between">
		<a href="/" aria-label="Company" title="Company" class="inline-flex items-center">
			<Logo class="w-10 h-10 mr-2" />
			<span class="text-xl font-medium">Progdocs</span>
		</a>

		<ul class=" items-center hidden space-x-8 lg:flex">
			{#each links as link}
				<li>
					<a
						href={link.href}
						aria-label="About us"
						title="About us"
						class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-primary-600"
						>{link.name}</a
					>
				</li>
			{/each}
		</ul>
		<ul class=" items-center hidden space-x-8 lg:flex">
			{#if !$sessionStore?.user}
				<li>
					<a
						href="/auth/login"
						class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-primary-700 focus:shadow-outline focus:outline-none"
						aria-label="Sign up"
						title="Sign up"
					>
						Login
					</a>
				</li>
			{:else}
				<li>
					<a
						href="/dashboard"
						class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-primary-700 focus:shadow-outline focus:outline-none"
						aria-label="Sign up"
						title="Sign up"
					>
						Dashboard
					</a>
				</li>
			{/if}
		</ul>
		<!-- Mobile menu -->
		<div class="lg:hidden">
			<button
				aria-label="Open Menu"
				on:click={toggleMenu}
				title="Open Menu"
				class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
			>
				<svg class="w-5 text-gray-600" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
					/>
					<path
						fill="currentColor"
						d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
					/>
					<path
						fill="currentColor"
						d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
					/>
				</svg>
			</button>
			<div
				class={clsx(`absolute top-0 left-0 w-full `, {
					hidden: !isOpen
				})}
			>
				<div class="p-5 bg-white border rounded shadow-sm">
					<div class="flex items-center justify-between mb-4">
						<div>
							<a href="/" aria-label="Company" title="Company" class="inline-flex items-center">
								<Logo class="w-10 h-10 mr-2" />
							</a>
						</div>
						<div>
							<button
								aria-label="Close Menu"
								on:click={toggleMenu}
								title="Close Menu"
								class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
							>
								<svg class="w-5 text-gray-600" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
									/>
								</svg>
							</button>
						</div>
					</div>
					<nav>
						<ul class="space-y-4">
							{#each links as link}
								<li>
									<a
										href={link.href}
										aria-label="About us"
										title="About us"
										class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-primary-600"
										>{link.name}</a
									>
								</li>
							{/each}
							{#if !$sessionStore?.user}
								<li>
									<a
										href="/"
										class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-primary-700 focus:shadow-outline focus:outline-none"
										aria-label="Sign up"
										title="Sign up"
									>
										Sign up
									</a>
								</li>
							{:else}
								<li>
									<a
										href="/dashboard"
										class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-primary-700 focus:shadow-outline focus:outline-none"
										aria-label="Dashboard"
										title="Dashboard"
									>
										Dashboard
									</a>
								</li>
							{/if}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>
