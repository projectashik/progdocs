import { env } from '$env/dynamic/private';
import { Octokit } from 'octokit';

export const getUser = async (username: string) => {
	const octo = new Octokit({
		auth: env.GITHUB_TOKEN
	});

	const user = await octo.rest.users.getByUsername({
		username
	});

	return user;
};
