<script lang="ts">
	import clsx from 'clsx';
	import './Paper.css';
	export let as = 'div';
	export let root = undefined;
	export let className: string;
	export let styles = ['bg-white dark:bg-neutral-800 dark:border-neutral-600 dark:text-white'];

	export let shadow: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' = 'none';

	$: {
		if (shadow !== 'none') {
			styles.push(`paper-shadow-${shadow}`);
		}
	}

	let isHTMLElement;
	let isComponent;
	$: {
		isHTMLElement = root && typeof root === 'string';
		isComponent = root && typeof root === 'function';
	}
</script>

{#if isHTMLElement}
	<svelte:element this={root} bind:this={as} class={clsx(className, ...styles)} {...$$restProps}>
		<slot />
	</svelte:element>
{:else if isComponent && typeof root !== 'string'}
	<svelte:component this={root} bind:this={as} class={clsx(className, ...styles)} {...$$restProps}>
		<slot />
	</svelte:component>
{:else}
	<div class={clsx(className, ...styles)} {...$$restProps}>
		<slot />
	</div>
{/if}
