import { visit } from 'unist-util-visit';
export default function retextSentenceSpacing() {
	return (tree: any, file: any) => {
		// console.log('tree');
		// console.log(tree);
		visit(tree, (node) => {
			if (node.type === 'raw') {
				console.log('Raw', node.value);
				if (node.value === '<CodeRenderer />') {
					// display `hello world` in the place of <CodeRenderer />
					node.value = '`hello world`';
				}
			}
		});
		return tree;
	};
}
