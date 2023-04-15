<script>
	import { goto } from '$app/navigation';
	import { sb } from '$lib/sb';
	import toast from 'svelte-french-toast';
	import { Paper } from 'ui';

	// use id as props
	export let id;

	const deleteSiteAction = async () => {
		try {
			const { error, data } = await sb.from('docs').delete().eq('id', id);

			toast.success('Site deleted successfully');
			goto('/dashboard');
		} catch (error) {
			toast.error('Something went wrong');
			console.log(error);
		}
	};
</script>

<Paper className="p-5 border border-red-500 rounded">
	<h2 class="font-medium text-2xl text-red-700">Danger</h2>

	<p class="text-red-600">You are about to delete this site. This action cannot be undone.</p>

	<div class="flex mt-4">
		<label for="deleteConfirm" class="btn btn-error">Delete</label>
	</div>

	<input type="checkbox" id="deleteConfirm" class="modal-toggle" />

	<div class="modal ">
		<div class="modal-box relative border-red-600 border-2">
			<label for="deleteConfirm" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
			<h3 class="text-lg font-bold">Are you sure you want to delete this site?</h3>
			<p class="py-4">This action cannot be undone. All data will be permanently deleted.</p>
			<div class="flex justify-end">
				<button on:click={deleteSiteAction} for="deleteConfirm" class="btn btn-error">Delete</button
				>

				<label for="deleteConfirm" class="btn btn-ghost">Cancel</label>
			</div>
		</div>
	</div>
</Paper>
