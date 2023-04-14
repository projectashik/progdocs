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

	console.log(data);
</script>

<header class="shadow border-b z-10  h-20 px-4 sticky top-0 bg-white">
	<div class="max-w-screen-xl mx-auto h-full justify-between flex items-center">
		<a href="/" class="text-xl btn glass text-gray-700"
			>{data && data.config ? data.config.title : data.docs.title}</a
		>

		<a
			href={`/${(
				(data.config && data.config.indexDoc && data.config.indexDoc) ||
				'getting-started.md'
			).replace('.md', '')}`}
			class="btn btn-ghost">Docs</a
		>
	</div>
</header>

<slot />
