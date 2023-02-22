<script>
	import { Button, Container, Logo, Text } from 'ui';
	import { user } from '../../stores/authStore';
</script>

<header class="border-b h-16  dark:border-neutral-600">
	<Container class="flex items-center h-full">
		<a href="/dashboard" class="inline-flex items-center" title="ProgDocs">
			<Logo width="45" height="45" />
			<Text as="span" className="ml-2 hidden md:inline-block" size="lg">ProgDocs</Text>
		</a>

		<div>
			<Button>
				{$user.email}
			</Button>
		</div>
	</Container>
</header>
