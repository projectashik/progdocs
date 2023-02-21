<script lang="ts">
	export let label = undefined;
	export let id = undefined;
	export let error = undefined;
</script>

<div class="flex flex-col">
	{#if label}
		<label class="block text-sm mb-0.5 dark:text-gray-100 font-medium text-gray-700" for={id}
			>{label}</label
		>
	{/if}
	<div
		class="flex w-full items-center border px-2 dark:bg-neutral-700 dark:border-neutral-500  focus-within:ring-2 ring-primary-600 rounded-lg bg-white"
	>
		<slot />
		<slot name="rightItem" />
	</div>

	{#if error}
		<div class="text-sm text-red-600 dark:text-red-400 mt-1">{error}</div>
	{/if}
</div>
