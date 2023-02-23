<script lang="ts">
	import { sb } from '$lib/sb';
	import { Text } from 'ui';
	import { sessionStore as session } from '../stores/authStore';

	const onLogout = async () => {
		console.log('Done');
		const { error } = await sb.auth.signOut();
		if (error) {
			console.error(error);
		}
	};
</script>

{#if !$session}
	<Text as="h1">I am not logged in</Text>
	<a class="btn btn-primary" href="/auth/login" variant="primary">Login</a>
{:else}
	<Text as="h1" size="lg">Welcome {$session.user.email}</Text>
	<Text>I am logged in!</Text>

	<button class="btn btn-primary" on:click={onLogout}>Logout</button>
{/if}
