import { sb } from '$lib/sb';

export const getAuthenticatedUser = async () => await sb.auth.getUser();
