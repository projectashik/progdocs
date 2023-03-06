<script>
	import { IconGlobe, IconSettings, Text } from 'ui';

	const settingsLinks = [
		{
			label: 'General',
			desc: 'Site Details and Metadata',
			link: `settings/general`,
			icon: IconSettings
		},
		{
			label: 'Navigation',
			desc: 'Nav links and CTA',
			link: `settings/navigation`,
			icon: IconSettings
		},
		{
			label: 'Code Injection',
			desc: 'Inject thirdparty scripts',
			link: `settings/code-injection`,
			icon: IconSettings
		},
		{
			label: 'Custom Domains',
			desc: 'Map your custom domains',
			link: `domains`,
			icon: IconGlobe
		}
	];
</script>

<div>
	<h2 class="text-2xl font-medium">Settings</h2>

	<div class="grid grid-cols-3 gap-3 mt-3">
		{#each settingsLinks as link}
			<a href={link.link} class="flex gap-3 border p-2 rounded-md hover:bg-white">
				<div
					class="bg-gray-400 w-12 h-12 rounded-full flex place-items-center justify-center font-bold"
				>
					<svelte:component this={link.icon} class="w-8 h-8 text-white" />
				</div>
				<div>
					<h3 class="font-semibold">{link.label}</h3>
					<Text>{link.desc}</Text>
				</div>
			</a>
		{/each}
	</div>
</div>
