<script>
	import { page } from '$app/stores';
	import { PUBLIC_DOCS_URL } from '$env/static/public';
	import Navbar from '$lib/components/Navbar.svelte';
	import { sb } from '$lib/sb';
	import { createQuery } from '@tanstack/svelte-query';
	import clsx from 'clsx';
	import { Container, IconAnalytics, IconDashboard, IconGlobe, IconSettings, Text } from 'ui';

	const links = [
		{
			icon: IconDashboard,
			label: 'Dashboard',
			link: `/dashboard/docs/${$page.params.id}`
		},
		{
			icon: IconGlobe,
			label: 'Domains',
			link: `/dashboard/docs/${$page.params.id}/domains`
		},
		{
			icon: IconAnalytics,
			label: 'Analytics',
			link: `/dashboard/docs/${$page.params.id}/analytics`
		}
	];
	const otherLinks = [
		{
			label: 'Settings',
			link: `/dashboard/docs/${$page.params.id}/settings`,
			icon: IconSettings
		}
	];

	const siteData = createQuery({
		queryFn: async () => await sb.from('docs').select('*').eq(`id`, $page.params.id).single(),
		queryKey: ['docs', $page.params.id]
	});
</script>

<div class="bg-gray-100 min-h-screen">
	<Navbar />
	<div class="bg-white border-r w-64 h-[calc(100dvh-64px)] fixed">
		<div class="p-3 space-y-1">
			{#if $siteData.data}
				<div class="flex gap-3 mb-2 bg-gray-50 border p-2 rounded-md">
					<div class="bg-gray-500 w-12 h-12 rounded-full" />
					<div>
						<h3 class="font-semibold">{$siteData.data.data.title}</h3>
						<Text as="a" href={`https://${$siteData.data.data.subdomain}.${PUBLIC_DOCS_URL}`}
							>{$siteData.data.data.subdomain}.{PUBLIC_DOCS_URL}</Text
						>
					</div>
				</div>
			{/if}
			{#each links as link}
				<a
					class={clsx('btn btn-ghost w-full justify-start gap-2', {
						'bg-gray-100': $page.url.pathname === link.link
					})}
					href={link.link}
				>
					<svelte:component this={link.icon} class="w-6 h-6" />
					{link.label}
				</a>
			{/each}
			<div class="divider" />
			{#each otherLinks as link}
				<a
					class={clsx('btn btn-ghost w-full justify-start gap-2', {
						'bg-gray-100': $page.url.pathname === link.link
					})}
					href={link.link}
				>
					<svelte:component this={link.icon} class="w-6 h-6" />
					{link.label}
				</a>
			{/each}
		</div>
	</div>
	<main class="ml-64">
		<Container class="py-3">
			<slot />
		</Container>
	</main>
</div>
