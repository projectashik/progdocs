<script lang="ts">
	import { PUBLIC_DOCS_URL } from '$env/static/public';
	import { github } from '$lib/github';
	import { sb } from '$lib/sb';
	import { validator } from '@felte/validator-zod';
	import type { Session } from '@supabase/supabase-js';
	import { useQueryClient } from '@tanstack/svelte-query';
	import clsx from 'clsx';
	import { createForm } from 'felte';
	import { onDestroy } from 'svelte';
	import toast from 'svelte-french-toast';

	const createDocsSchema = z.object({
		title: z
			.string({
				required_error: 'Title is required'
			})
			.nonempty("Title can't be empty"),
		subDomain: z
			.string({
				required_error: 'Sub Domain is required'
			})
			.regex(/^[a-zA-Z]+[a-zA-Z\d\-]*$/, "Sub Domain can't contain special characters")
			.nonempty("Sub Domain can't be empty"),
		githubUrl: z
			.string({
				required_error: 'Github URL is required'
			})
			.regex(
				// the repo url only
				/^([a-zA-Z\d\-]+\/[a-zA-Z.\d\-]+)(\/tree\/[a-zA-Z\d\-]+\/)?$/,
				'Invalid Github URL'
			)
	});

	import { goto } from '$app/navigation';
	import { Input } from 'ui';
	import { z } from 'zod';
	import { sessionStore } from '../../stores/authStore';
	let session: Session | null;

	const unsubsribe = sessionStore.subscribe((value) => (session = value));
	let loading;

	$: {
		loading = false;
	}

	const queryClient = useQueryClient();

	let handleSubmit = async (values) => {
		loading = true;
		try {
			await github.validateRepoUrl(values.githubUrl);

			const { error, status, data } = await sb.from('docs').insert({
				title: values.title,
				subdomain: values.subDomain,
				user_id: session.user.id,
				github_url: values.githubUrl
			});
			console.log(data, status, error);
			if (error) {
				loading = false;
				if (error.code === '23505') {
					setErrors('subDomain', 'The subdomain is already taken.');
				}
			}

			if (status === 201) {
				loading = false;
				toast.success("You've successfully created a docs.");
				queryClient.invalidateQueries({
					queryKey: ['docs']
				});

				const res = await sb.from('docs').select('*').eq('subdomain', values.subDomain).single();

				goto(`/dashboard/docs/${res.data.id}`);

				reset();
			}
		} catch (error) {
			loading = false;
			setErrors('githubUrl', 'Invalid Github URL');
			return;
		}
	};

	const { form, errors, setErrors, reset } = createForm({
		initialValues: {
			title: undefined,
			subDomain: undefined
		},
		extend: validator({
			schema: createDocsSchema
		}),
		onSubmit: handleSubmit
	});

	onDestroy(unsubsribe);
</script>

<div class="modal">
	<form use:form class="space-y-2">
		<div class="modal-box">
			<div>
				<h2 class="font-bold text-xl">Create a docs now</h2>
				<Input error={$errors.title} name="title" label="Title" placeholder="Enter a title" />
				<Input
					name="subDomain"
					error={$errors.subDomain}
					info="This will be the subdomain of your docs."
					leftText="https://"
					label="Sub Domain (You can change this later)"
					rightText={`.${PUBLIC_DOCS_URL}`}
					placeholder="Sub Domain"
				/>
				<Input
					name="githubUrl"
					error={$errors.githubUrl}
					label="Github URL (Public Repo)"
					placeholder="projectashik/progdocs"
				/>
				<div class="modal-action mt-4">
					<label for="my-modal" class="btn btn-ghost">Cancel</label>
					<button
						type="submit"
						class={clsx('btn ', {
							loading: loading
						})}>Create</button
					>
				</div>
			</div>
		</div>
	</form>
</div>
