<script>
	import { goto } from '$app/navigation';
	import { sb } from '$lib/sb';
	import { Container, Logo } from 'ui';
	import { sessionStore } from '../../stores/authStore';
</script>

<div class="bg-base-100 h-16 border-b">
	<Container className="flex h-full items-center justify-between">
		<div class="flex-1">
			<a href="/dashboard" class="inline-flex btn btn-ghost normal-case text-xl">
				<Logo class="w-10 h-10 mr-2" />
				<span class="hidden md:inline"> ProdDocs </span></a
			>
		</div>
		<div class="flex-none gap-2">
			<div class="dropdown dropdown-end">
				<button class="btn btn-outline avatar">
					{$sessionStore.user?.email}
				</button>
				<ul class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
					<li>
						<button
							on:click={async () => {
								await sb.auth.signOut();
								goto('/auth/login');
								sessionStore.set(null);
							}}>Logout</button
						>
					</li>
				</ul>
			</div>
		</div>
	</Container>
</div>
