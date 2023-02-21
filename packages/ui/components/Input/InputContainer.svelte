<script lang="ts">
	import clsx from "clsx";
	import Text from "../Text/Text.svelte";


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
		class={clsx(
			"flex w-full items-center border px-2 dark:bg-neutral-700 dark:border-neutral-500  focus-within:ring-2 ring-primary-600 rounded-lg bg-white",{
				"border-red-600 dark:border-red-400": error,
 }		)}
	>
		<slot />
		<slot name="rightItem" />
	</div>

	{#if error}
		<Text as="p" variant="danger" className="mt-0.5">{error}</Text>
	{/if}
</div>
