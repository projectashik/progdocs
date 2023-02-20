<script lang="ts">
    import { invalidate } from '$app/navigation';
    import { sb } from '$lib/sb';
    import { onMount } from 'svelte';

    onMount(() => {
      const {
        data: { subscription },
      } = sb.auth.onAuthStateChange(() => {
        invalidate('supabase:auth')
      })

      return () => {
        sb.unsubscribe()
      }
    })
  </script>

  <slot />