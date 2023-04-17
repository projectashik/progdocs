<script>
	import clsx from 'clsx';
	import { IconGlobe, IconSettings, Text } from 'ui';

	const settingsLinks = [
		{
			label: 'General',
			desc: 'Site Details and Metadata',
			link: `settings/general`,
			icon: IconSettings,
			disabled: false
		},
		{
			label: 'Navigation',
			desc: 'Nav links and CTA',
			link: `settings/navigation`,
			icon: IconSettings,
			disabled: true
		},
		{
			label: 'Code Injection',
			desc: 'Inject thirdparty scripts',
			link: `settings/code-injection`,
			icon: IconSettings,
			disabled: true
		},
		{
			label: 'Custom Domains',
			desc: 'Map your custom domains',
			link: `domains`,
			icon: IconGlobe,
			disabled: true
		}
	];
</script>

<div>
	<h2 class="text-2xl font-medium">Settings</h2>

	<div class="grid grid-cols-3 gap-3 mt-3">
		{#each settingsLinks as link}
			<a
				href={link.disabled ? '#' : link.link}
				class={clsx('flex gap-3 border p-5 rounded-md relative hover:bg-white ', {
					'opacity-70 hover:cursor-not-allowed': link.disabled
				})}
			>
				<div
					class="bg-gray-400 w-12 h-12 rounded-full flex place-items-center justify-center font-bold"
				>
					<svelte:component this={link.icon} class="w-8 h-8 text-white" />
				</div>
				<div>
					<h3 class="font-semibold">{link.label}</h3>
					<Text>{link.desc}</Text>
					{#if link.disabled}
						<div class="absolute top-1 left-1 bg-primary-500 text-white text-xs p-0.5 px-1 rounded">
							Coming soon
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
