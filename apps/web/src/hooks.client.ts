import '$lib/sb';
import { sb } from '$lib/sb';
import { sessionStore } from './stores/authStore';

sb.auth.onAuthStateChange((event, session) => {
	console.log('onAuthStateChange', event, session);
	sessionStore.set(session ?? null);
});
