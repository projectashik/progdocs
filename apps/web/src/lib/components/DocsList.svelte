<script>
	import { PUBLIC_DOCS_URL } from '$env/static/public';
	import { sb } from '$lib/sb';
	import { createQuery } from '@tanstack/svelte-query';
	import { IconAdd, IconExternalLink, IconGear, Paper, Text } from 'ui';
	import { sessionStore } from '../../stores/authStore';

	const docs = createQuery({
		queryKey: ['docs'],
		queryFn: async () =>
			await sb.from('docs').select('*').eq('user_id', $sessionStore.user.id).order('created_at', {
				ascending: false
			})
	});
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
	<label
		for="my-modal"
		class="card  active:scale-95 transition-transform hover:bg-gray-50 !border-2 h-56 !border-dashed flex flex-col items-center justify-center"
	>
		<IconAdd width="80" height="80" />
		<p class="text-center">Create a documentation</p>
	</label>

	{#if $docs.isLoading}
		<div>Loading...</div>
	{:else if $docs.isError}
		<div>Error: {$docs.error.message}</div>
	{:else}
		{#each $docs.data.data as doc}
			<Paper className="border rounded-md shadow bg-gray-50">
				<div class=" p-8">
					<div class="flex gap-3">
						<div class="bg-gray-500 w-12 h-12 rounded-full" />
						<div>
							<h3 class="font-semibold">{doc.title}</h3>
							<Text as="a" href={`https://${doc.subdomain}.${PUBLIC_DOCS_URL}`}
								>{doc.subdomain}.{PUBLIC_DOCS_URL}</Text
							>
						</div>
					</div>
					<div class="pt-4 pb-2">
						<p class="text-sm text-gray-800">
							<strong>Last Updated At:</strong>
							{new Date(doc.updated_at || doc.created_at).toString()}
						</p>
					</div>
				</div>
				<div class="px-8 py-3 bg-gray-100 flex justify-end gap-2">
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://${doc.subdomain}.${PUBLIC_DOCS_URL}`}
						class="btn btn-outline btn-sm gap-1"
					>
						View
						<IconExternalLink width="16" height="16" />
					</a>
					<a href={`/dashboard/docs/${doc.id}`} class="btn btn-sm gap-1"
						><IconGear width="16" height="16" /> Dashboard</a
					>
				</div>
			</Paper>
		{/each}
	{/if}
</div>
