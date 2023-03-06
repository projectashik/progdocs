<script lang="ts">
	let id;
	let label;
	let error;
	let info;

	export { id, label, error };
</script>

<div class="form-control w-full ">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label for={id} class="label">
		<span class="label-text">{label}</span>
	</label>
	<slot />
	{#if error}
		<span class="label-text-alt mt-1 text-red-500">{error}</span>
	{/if}
</div>
