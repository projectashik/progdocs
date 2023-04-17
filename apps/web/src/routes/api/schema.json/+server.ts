import { json } from '@sveltejs/kit';

export function GET() {
	return json({
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			description: {
				description: 'The description of the project',
				type: 'string'
			},
			indexDoc: {
				description: 'The path to the document that will be used as the index docs page',
				type: 'string'
			},
			landingMarkdown: {
				description: 'The markdown for the landing page',
				type: 'string'
			},
			features: {
				type: 'array',
				items: [
					{
						type: 'object',
						properties: {
							title: {
								description: 'The title of the feature',
								type: 'string'
							},
							description: {
								description: 'The description of the feature',
								type: 'string'
							}
						},
						required: ['title', 'description']
					}
				]
			},
			sidebar: {
				description: 'The sidebar items',
				type: 'array',
				items: [
					{
						type: 'object',
						properties: {
							title: {
								description: 'The title of the sidebar item',
								type: 'string'
							},
							children: {
								type: 'array',
								items: [
									{
										description: 'The title of the sidebar item',
										type: 'string'
									},
									{
										description: 'The path to the document',
										type: 'string'
									}
								]
							},
							file: {
								description: 'The path to the document',
								type: 'string'
							}
						}
					}
				]
			},
			developers: {
				description: 'The developers',
				type: 'array',
				items: [
					{
						type: ['object', 'string'],
						description:
							"The github username of the developer or an object with the developer's name and github username, bio, twitter account and avatar link",

						properties: {
							name: {
								description: 'The name of the developer',
								type: 'string'
							},
							gh: {
								description: 'The github username of the developer',
								type: 'string'
							},
							bio: {
								description: 'The bio of the developer',
								type: 'string'
							},
							twitter: {
								description: 'The twitter account of the developer',
								type: 'string'
							},
							avatar: {
								description: 'The avatar link of the developer',
								type: 'string'
							}
						}
					}
				]
			}
			// settings: {
			// 	type: 'object',
			// 	properties: {
			// 		contributors: {
			// 			type: 'boolean'
			// 		},
			// 		editOnGitHub: {
			// 			type: 'boolean'
			// 		}
			// 	},
			// 	required: ['contributors', 'editOnGitHub']
			// }
		},
		required: [
			'title',
			'description',
			'indexDoc',
			'landingMarkdown',
			'features',
			'sidebar',
			'developers'
		]
	});
}
