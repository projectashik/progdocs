import axios from 'axios';

const URL = 'https://api.github.com';

const validateRepoUrl = async (url: string) => {
	const { status } = await axios.get(`${URL}/repos/${url}`);
	return { status };
};

export const github = {
	validateRepoUrl
};
