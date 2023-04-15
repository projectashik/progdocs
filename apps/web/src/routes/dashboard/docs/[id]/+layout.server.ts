import { sb } from '$lib/sb';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	let id = event.params.id;
	let data = await sb.from('docs').select('*').eq('id', id).single();

	return {
		doc: data.data
	};
};
