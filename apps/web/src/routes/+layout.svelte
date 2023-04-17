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

<svelte:head>
	<title>ProgDocs - Convert markdown to beautiful docs</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<Toaster />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
