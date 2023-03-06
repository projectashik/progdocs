<script lang="ts">
	import { sb } from '$lib/sb';
	import { validator } from '@felte/validator-zod';
	import { confetti } from '@neoconfetti/svelte';
	import clsx from 'clsx';
	import { createForm } from 'felte';
	import { toast } from 'svelte-french-toast';
	import { IconGithub, Input, Paper, Text } from 'ui';
	import { z } from 'zod';

	const loginSchema = z.object({
		email: z
			.string({
				required_error: 'Email is required'
			})
			.email('Email must be a valid email address')
	});

	let loading = false;
	let email: string;

	const handleLogin = async (values) => {
		loading = true;
		await sb.auth.signInWithOtp({ email: values.email });
	};

	let showConfetti = false;

	const {
		form: loginForm,
		errors,
		setErrors
	} = createForm({
		onSubmit: handleLogin,
		onSuccess: async () => {
			loading = false;
			showConfetti = true;
			setTimeout(() => {
				showConfetti = false;
			}, 3000);
			toast.success('Check your email for a login link');
		},
		onError: (error) => {
			loading = false;
			setErrors('email', error.message);
			console.log('error:', error);
		},
		extend: validator({
			schema: loginSchema
		})
	});
</script>

<Paper className="max-w-md mx-auto mt-20 rounded-md border	 p-6">
	<form use:loginForm class="relative row flex-center flex flex-col space-y-3">
		<Text size="2xl">Login</Text>
		<Input
			error={$errors.email}
			className="text-lg"
			name="email"
			label="Email"
			placeholder="Your Email"
			type="text"
		/>
		<div>
			<button
				class={clsx('btn btn-primary', {
					loading: loading
				})}
				type="submit">Login</button
			>
			{#if showConfetti}
				<div>
					<div class="absolute inset-0" use:confetti={{ duration: 1500 }} />
				</div>
			{/if}
		</div>
	</form>
	<div class="divider">OR</div>
	<button
		class="btn gap-2  w-full"
		on:click={() =>
			sb.auth.signInWithOAuth({
				provider: 'github'
			})}
		><IconGithub width="20" height="20" /> SignIn with GitHub
	</button>
</Paper>
