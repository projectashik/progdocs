<script lang="ts">
	import '../app.css';

	// console.log(data);
	export let data;
</script>

<header class="shadow border-b  h-16">
	<div class="max-w-screen-xl mx-auto h-full flex items-center">
		<a href="/" class="text-xl btn glass text-gray-700">{data.docs.title}</a>
	</div>
</header>

<slot />
