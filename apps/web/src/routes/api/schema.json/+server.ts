import { json } from '@sveltejs/kit';

export function GET() {
	return json({
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			title: {
				type: 'string'
			},
			description: {
				type: 'string'
			},
			indexDoc: {
				type: 'string'
			},
			landingMarkdown: {
				type: 'string'
			},
			features: {
				type: 'array',
				items: [
					{
						type: 'object',
						properties: {
							title: {
								type: 'string'
							},
							description: {
								type: 'string'
							}
						},
						required: ['title', 'description']
					}
				]
			},
			sidebar: {
				type: 'array',
				items: [
					{
						type: 'object',
						properties: {
							title: {
								type: 'string'
							},
							children: {
								type: 'array',
								items: [
									{
										type: 'string'
									},
									{
										type: 'string'
									}
								]
							}
						},
						required: ['title', 'children']
					} || {
						type: 'object',
						properties: {
							file: {
								type: 'string'
							}
						},
						required: ['file']
					}
				]
			},
			developers: {
				type: 'array',
				items: [
					{
						type: 'string'
					},
					{
						type: 'object',
						properties: {
							name: {
								type: 'string'
							},
							gh: {
								type: 'string'
							},
							bio: {
								type: 'string'
							},
							twitter: {
								type: 'string'
							},
							avatar: {
								type: 'string'
							}
						},
						required: ['name', 'gh', 'bio', 'twitter', 'avatar']
					}
				]
			},
			settings: {
				type: 'object',
				properties: {
					contributors: {
						type: 'boolean'
					},
					editOnGitHub: {
						type: 'boolean'
					}
				},
				required: ['contributors', 'editOnGitHub']
			}
		},
		required: [
			'title',
			'description',
			'indexDoc',
			'landingMarkdown',
			'features',
			'sidebar',
			'developers',
			'settings'
		]
	});
}
