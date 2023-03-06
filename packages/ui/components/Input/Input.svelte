<script>
	import clsx from 'clsx';
	import InputContainer from './InputContainer.svelte';

	let label;
	let id;
	let error;
	let type = 'text';
	let rightText;
	let leftText;
	$: {
		if (label && !id) {
			id = label.replace(/\s+/g, '-').toLowerCase();
		} else {
			id = `input-${Math.random().toString(36).substr(2, 9)}`;
		}
	}
	export { label, id, error, rightText, leftText };
</script>

<InputContainer {label} {id} {error}>
	<div class={clsx({ 'input-group': rightText || leftText })}>
		{#if leftText}
			<span class="text-gray-600">{leftText}</span>
		{/if}
		<input
			{type}
			{id}
			class={clsx('input input-bordered w-full', {
				'input-error': error
			})}
			{...$$restProps}
		/>
		{#if rightText}
			<span class="text-gray-600">{rightText}</span>
		{/if}
	</div>
</InputContainer>
