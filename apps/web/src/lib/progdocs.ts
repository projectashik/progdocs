import getFileContent from './getFile';

export const readConfig = async (repo: string) => {
	// @ts-ignore
	const content = await getFileContent(repo, 'progdocs.json');
	return JSON.parse(content);
};
