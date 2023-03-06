import { env } from '$env/dynamic/private';
import { Octokit } from 'octokit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const repo = 'projectashik/shtr.tk';
	const octokit = new Octokit({
		auth: env.GITHUB_TOKEN
	});
	const { data } = await octokit.rest.repos.getContent({
		owner: repo.split('/')[0],
		repo: repo.split('/')[1]
	});
	console.log(data);
};
