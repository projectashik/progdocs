<!-- create a Text component in Svelte with all the styles of mantine -->
<script lang="ts">
	import clsx from 'clsx';
	import { ComponentProps, SvelteComponent } from 'svelte';

	interface $$Props extends ComponentProps<SvelteComponent> {
		as?: HTMLElement | SvelteComponent;
		className?: string;
		variant?: 'default' | 'muted' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
	}

	export let as: HTMLElement | SvelteComponent = 'p';

	export let className: string;
	export let styles = [];

	const sizeStyles = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl font-semibold',
		'2xl': 'text-2xl font-semibold',
		'3xl': 'text-3xl font-semibold',
		'4xl': 'text-4xl font-semibold',
		'5xl': 'text-5xl font-semibold',
		'6xl': 'text-6xl font-semibold'
	};

	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' = 'sm';

	$: {
		styles.push(sizeStyles[size]);
	}
</script>

{#if typeof as === 'string'}
	<svelte:element this={as} class={clsx(className, ...styles)} {...$$restProps}>
		<slot />
	</svelte:element>
{:else}
	<svelte:component this={as} class={clsx(className, ...styles)} {...$$restProps}>
		<slot />
	</svelte:component>
{/if}
