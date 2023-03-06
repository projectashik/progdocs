<script>
	import DocsList from '$lib/components/DocsList.svelte';
	import CreateDocsForm from '$lib/forms/CreateDocsForm.svelte';
	import DashboardLayout from '$lib/layouts/DashboardLayout.svelte';
	import { IconSearch } from 'ui';
</script>

<DashboardLayout>
	<form>
		<div class="input-group w-full max-w-lg mx-auto">
			<input class="input input-bordered w-full" type="text" placeholder="Search your docs..." />
			<button class="btn bg-gray-200 border-0 hover:bg-gray-300">
				<IconSearch />
			</button>
		</div>
	</form>

	<DocsList />

	<input type="checkbox" class="modal-toggle" id="my-modal" />
	<CreateDocsForm />
</DashboardLayout>
