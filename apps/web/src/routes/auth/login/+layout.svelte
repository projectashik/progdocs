<script lang="ts">
	import { goto } from '$app/navigation';
	import { getAuthenticatedUser } from '$lib/queries';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['user'],
		queryFn: getAuthenticatedUser
	});
</script>

{#if $query.isLoading}
	<div>Loading...</div>
{:else if $query.isError}
	<div>Error: {$query.error.message}</div>
{:else}
	<!-- <div>{JSON.stringify($query.data)}</div> -->
	{#if $query.data.data.user === null && !$query.isLoading}
		<slot />
	{:else}
		{goto('/dashboard')}
	{/if}
{/if}
