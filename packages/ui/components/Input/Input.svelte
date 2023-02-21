<script>
	import clsx from 'clsx';
	import InputContainer from './InputContainer.svelte';

	export let label = undefined;
	export let id = undefined;
	export let error = undefined;
	export let className = undefined;
</script>

<InputContainer {label} {id} {error} {...$$restProps}>
	<input
		{id}
		class={clsx(
			'flex-1 py-2.5  text-sm px-2 focus:outline-none bg-transparent dark:text-gray-100 text-gray-700',
			className
		)}
		{...$$restProps}
	/>
	<span slot="rightItem">
		<slot name="rightItem" />
	</span>
</InputContainer>
