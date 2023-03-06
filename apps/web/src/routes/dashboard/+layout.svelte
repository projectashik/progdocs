<script lang="ts">
	import { goto } from '$app/navigation';
	import { getAuthenticatedUser } from '$lib/queries';
	import { createQuery } from '@tanstack/svelte-query';
	import { barStore } from '../../stores/barStore';

	const query = createQuery({
		queryKey: ['user'],
		queryFn: getAuthenticatedUser
	});
</script>

{#if $query.isLoading}
	{barStore.set(true) ?? ''}
	<div>Loading...</div>
{:else if $query.isError}
	{barStore.set(false) ?? ''}
	<div>Error: {$query.error.message}</div>
{:else}
	{barStore.set(false) ?? ''}
	<!-- <div>{JSON.stringify($query.data)}</div> -->
	{#if $query.data.data.user === null && !$query.isLoading}
		<div>Not logged in</div>
		{goto('/auth/login')}
	{:else}
		<slot />
	{/if}
{/if}
