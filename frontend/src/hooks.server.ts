import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Create a per-request PocketBase instance so auth state is never shared
	// between concurrent server requests.
	event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	// Load auth from the cookie sent by the browser.
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
		}
	} catch {
		// Token expired or invalid — clear it so the user is treated as logged out.
		event.locals.pb.authStore.clear();
	}

	event.locals.user = event.locals.pb.authStore.isValid
		? (event.locals.pb.authStore.model as App.Locals['user'])
		: null;

	const response = await resolve(event);

	// Persist the (possibly refreshed) auth token back to the browser cookie.
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: true, secure: true, sameSite: 'Lax' })
	);

	return response;
};
