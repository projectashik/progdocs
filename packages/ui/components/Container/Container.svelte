<script lang="ts">
	import clsx from 'clsx';

	let className: string = $$restProps['class'];

	export { className };
</script>

<div class={clsx('max-w-screen-xl mx-auto px-4 md:px-8', className)}>
	<slot />
</div>
