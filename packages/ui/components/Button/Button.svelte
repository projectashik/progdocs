<script lang="ts">
	import clsx from 'clsx';
	import { SvelteComponent } from 'svelte';
	import Loader from '../icons/Loader.svelte';
	import ButtonContainer from './ButtonContainer.svelte';

	// Props
	let as: HTMLElement | SvelteComponent = 'button';
	let icon: SVGElement;
	let iconPosition: 'left' | 'right' = 'left';
	let loading: boolean = false;
	let disabled: boolean = false;

	export { as, icon, iconPosition, loading, disabled };
</script>

<ButtonContainer disabled={disabled || loading} {as} {loading} {...$$restProps}>
	{#if loading}
		<div class="absolute inset-0 inline-flex items-center justify-center animate-spin">
			<Loader class="w-5 h-5" />
		</div>
	{/if}
	{#if icon && iconPosition === 'left'}
		<svelte:component
			this={icon}
			class={clsx('w-5 h-5 mr-2 ', {
				invisible: loading
			})}
		/>
	{/if}
	<span
		class={clsx({
			invisible: loading
		})}
	>
		<slot />
	</span>

	{#if icon && iconPosition === 'right'}
		<svelte:component
			this={icon}
			class={clsx('w-5 h-5 ml-2 ', {
				invisible: loading
			})}
		/>
	{/if}
</ButtonContainer>
