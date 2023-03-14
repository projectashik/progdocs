<script lang="ts">
	import '../app.css';

	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';

	import 'ui/nprogress.css';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating && browser) {
			NProgress.start();
		}
		if (!$navigating && browser) {
			NProgress.done();
		}
	}

	// console.log(data);
	export let data;
</script>

<header class="shadow border-b z-10  h-20 px-4 sticky top-0 bg-white">
	<div class="max-w-screen-xl mx-auto h-full flex items-center">
		<a href="/" class="text-xl btn glass text-gray-700">{data.docs.title}</a>
	</div>
</header>

<slot />
