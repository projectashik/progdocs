<script>
	import SettingsDelete from '$lib/components/SettingsSections/SettingsDelete.svelte';
	import { github } from '$lib/github';
	import { sb } from '$lib/sb';
	import { validator } from '@felte/validator-zod';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { createForm } from 'felte';
	import toast from 'svelte-french-toast';
	import { Button, Input, Paper } from 'ui';
	import { z } from 'zod';
	export let data;

	const updateDocSchema = z.object({
		title: z
			.string({
				required_error: 'Title is required'
			})
			.nonempty("Title can't be empty"),
		githubUrl: z
			.string({
				required_error: 'GitHub URL is required'
			})
			.regex(
				// the repo url only
				/^([a-zA-Z\d\-]+\/[a-zA-Z.\d\-]+)(\/tree\/[a-zA-Z\d\-]+\/)?$/,
				'Invalid Github URL'
			)
	});

	let loading = false;

	const handleSubmit = async (values) => {
		loading = true;
		if (values.githubUrl !== data.doc.github_url) {
			try {
				await github.validateRepoUrl(values.githubUrl);
			} catch (error) {
				loading = false;
				setErrors('githubUrl', 'Invalid Github Url');
				return;
			}
		}

		try {
			const res = await sb
				.from('docs')
				.update({
					title: values.title,
					github_url: values.githubUrl
				})
				.eq('id', data.doc.id);

			toast.success('Doc details updated successfully');

			useQueryClient().invalidateQueries(['docs', data.doc.id]);
			loading = false;
		} catch (error) {
			toast.error(`Error updating doc ` + error.message);
			loading = false;
		}
	};

	const { form, errors, setErrors } = createForm({
		initialValues: {
			title: data.doc.title,
			githubUrl: data.doc.github_url
		},
		extend: validator({
			schema: updateDocSchema
		}),
		onSubmit: handleSubmit
	});
</script>

<Paper className="mb-2 p-6 border rounded">
	<h2 class="text-xl font-medium">Update details</h2>
	<form use:form class="flex flex-col gap-3">
		<Input error={$errors.title} name="title" label="Title" placeholder="Enter a title" />
		<Input
			name="githubUrl"
			error={$errors.githubUrl}
			label="Github URL (Public Repo)"
			placeholder="projectashik/progdocs"
		/>

		<div>
			<Button {loading}>Save</Button>
		</div>
	</form>
</Paper>
<SettingsDelete id={data.doc.id} />
