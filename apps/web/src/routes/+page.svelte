<script lang="ts">
	import { Button, Text } from 'ui';
	import { user } from '../stores/authStore';
</script>

{#if !$user}
	<Text as="h1">I am not logged in</Text>
	<Button as="a" href="/auth/login" variant="primary">Login</Button>
{:else}
	<Text as="h1" size="lg">Welcome {$user.email}</Text>
	<Text>I am logged in!</Text>

	<form action="/auth/logout" method="POST">
		<Button type="submit" variant="primary">Logout</Button>
	</form>
{/if}
