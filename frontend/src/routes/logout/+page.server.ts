import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		locals.pb.authStore.clear();
		locals.user = null;
		// Explicitly expire the cookie in the browser
		cookies.delete('pb_auth', { path: '/' });
		redirect(303, '/');
	}
};
