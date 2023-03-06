<script lang="ts">
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import NProgress from 'nprogress';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	// NProgress css
	import 'ui/nprogress.css';
	import { barStore } from '../stores/barStore';

	let isAnotherProcessRunning;

	barStore.subscribe((value) => {
		isAnotherProcessRunning = value;
	});

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if (($navigating || isAnotherProcessRunning) && browser) {
			NProgress.start();
		}
		if (!$navigating && !isAnotherProcessRunning && browser) {
			NProgress.done();
		}
	}

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<Toaster />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
