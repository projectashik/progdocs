<script lang="ts">
  import { Button } from 'ui';
  import { user } from '../stores/authStore';
</script>

{#if !$user}
<h1>I am not logged in</h1>
<Button as="a" href="/auth/login" variant="primary">Login</Button>
{:else}
<h1>Welcome {$user.email}</h1>
<p>I am logged in!</p>

<form action="/auth/logout" method="POST">
  <Button type="submit" variant="primary">Logout</Button>
</form>
{/if}