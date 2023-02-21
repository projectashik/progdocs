<script lang="ts">
	import FeLogin from '$lib/icons/FeLogin.svelte';
	import { sb } from '$lib/sb';
	import { Button, Input, Paper, Text } from 'ui';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await sb.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<Paper shadow="lg" className="max-w-md mx-auto mt-20 rounded-md border p-6">
	<form class="row flex-center flex flex-col space-y-3" on:submit|preventDefault={handleLogin}>
		<Text size="xl">Login</Text>
		<Input
			error="You got it wrong."
			id="email"
			bind:value={email}
			label="Email"
			placeholder="Your Email"
			type="text"
		/>
		<div>
			<Button icon={FeLogin} variant="primary" iconPosition="right" type="submit" {loading}
				>Login</Button
			>
		</div>
	</form>
</Paper>
