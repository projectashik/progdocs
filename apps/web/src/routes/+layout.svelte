<script lang="ts">
	import { sb } from '$lib/sb';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import { user } from '../stores/authStore';

	onMount(() => {
		const {
			data: { subscription }
		} = sb.auth.onAuthStateChange((event, session) => {
			invalidate('supabase:auth');
			user.set(session?.user);
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Toaster />
<slot />
