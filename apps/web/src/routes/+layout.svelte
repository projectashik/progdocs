<script lang="ts">
	import { sb } from '$lib/sb';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import { user } from '../stores/authStore';

	$: {
		const {
			data: { subscription }
		} = sb.auth.onAuthStateChange((event, session) => {
			user.set(session?.user);
		});
	}
</script>

<Toaster />
<slot />
