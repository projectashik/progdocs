<script lang="ts">
	import clsx from 'clsx';
	import { SvelteComponent } from 'svelte';

	let as: HTMLElement | SvelteComponent = href ? 'a' : 'button';
	let className: string;
	let href = undefined;
	let variant: 'default' | 'outline' | 'danger' | 'primary' = 'default';
	let size: 'sm' | 'md' | 'lg' = 'md';

	let styles = [
		'relative shadow-lg border disabled:ring-0 disabled:cursor-not-allowed disabled:opacity-70 focus:ring-2 active:ring-2  dark:ring-neutral-400 transition text-sm font-medium text-gray-50 px-6 py-2.5 rounded-xl',
		'cursor-pointer inline-flex items-center ring-offset-2 ring-offset-white dark:ring-offset-neutral-800'
	];

	const variantStyles = {
		default:
			'border-neutral-600 dark:border-neutral-600 bg-neutral-800  text-white hover:bg-neutral-900 dark:hover:bg-neutral-700',
		outline:
			'border-neutral-600 dark:border-neutral-600 bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700',
		danger:
			'border-red-600 dark:border-red-600 bg-red-600 dark:bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-700',
		primary:
			'border-primary-600 dark:border-primary-600 bg-primary-600 dark:bg-primary-600 text-white hover:bg-primary-700 dark:hover:bg-primary-700'
	};

	const sizeStyles = {
		sm: 'px-4 py-2 text-xs',
		md: 'px-6 py-3 text-sm',
		lg: 'px-8 py-4 text-base'
	};



	$: {
		styles.push(variantStyles[variant]);
		styles.push(sizeStyles[size]);
	}

	export { as, className, href, variant, size };
</script>

{#if typeof as === 'string'}
	<svelte:element this={as} class={clsx(className, ...styles)} {href} {...$$restProps}>
		<slot />
	</svelte:element>
{:else}
	<svelte:component this={as} class={clsx(className, {}, ...styles)} {href} {...$$restProps}>
		<slot />
	</svelte:component>
{/if}
