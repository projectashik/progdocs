<script lang="ts">
	import { PUBLIC_DOCS_URL } from '$env/static/public';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="bg-white border rounded p-3">
	<div class="">
		{#if !data.config}
			<h2 class="font-bold text-3xl">
				Create <code class="bg-gray-200 rounded">`progdocs.json`</code> file.
			</h2>
			<pre class="bg-gray-900 p-3 rounded text-white">
			{JSON.stringify(
					{
						description: '<Your Description>',
						indexDoc: 'index.md',
						landingMarkdown: 'content.md',
						features: [
							{
								title: 'Free and open source.',
								description: 'Shtr. is free and open source available in MIT license on Github.'
							}
						],
						sidebar: [
							{
								title: 'Installtion',
								children: ['installation/1.md', 'installation/2.md']
							},
							{
								file: 'index.md'
							}
						],
						developers: [
							'projectashik',
							{
								name: 'Ashik Chapagain',
								gh: 'projectashik60',
								bio: 'A professional full stack web developer with all the knowledge of technology',
								twitter: 'ChapagainAshik',
								avatar: 'https://avatars.githubusercontent.com/u/47524279?v=4'
							}
						],
						settings: {
							contributors: true,
							editOnGitHub: true
						}
					},
					null,
					2
				)}
    	</pre>
		{:else if !data.config.indexDoc || !data.config.landingMarkdown}
			<div>
				<div class="bg-red-200 mb-3 text-red-600 border rounded border-red-500 p-2">
					Your configuration file is detected but it is not valid.
					<ul>
						{#if !data.config.indexDoc}
							<li><code>`indexDoc:` is not listed</code></li>
						{/if}
						{#if !data.config.landingMarkdown}
							<li><code>`landingMarkdown:` is not listed</code></li>
						{/if}
					</ul>

					<a
						rel="noreferrer"
						target="_blank"
						href={`https://github.com/${data.doc.github_url}/edit/main/progdocs.json`}
					>
						Edit
					</a>
				</div>

				<pre class="bg-gray-900 p-3 rounded text-white">{JSON.stringify(data.config, null, 2)}</pre>
			</div>
		{:else}
			<div>
				<div class="bg-green-200 text-green-600 border rounded border-green-500 p-2">
					Your configuration file is detected.
				</div>

				<a
					rel="noreferrer"
					target="_blank"
					href={`https://${data.doc.subdomain}.${PUBLIC_DOCS_URL}`}
					class="btn"
				>
					Visit
				</a>
			</div>
		{/if}
	</div>
</div>
