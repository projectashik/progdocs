<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import { Container } from 'ui';
</script>

<div>
	<Navbar />
	<main>
		<Container class="py-3">
			<slot />
		</Container>
	</main>
</div>
