import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');
	if (locals.user.ndaAccepted) redirect(303, '/dashboard');
};

export const actions: Actions = {
	accept: async ({ locals }) => {
		if (!locals.user) return fail(401, { error: 'Not authenticated.' });

		try {
			await locals.pb.collection('users').update(locals.user.id, {
				ndaAccepted: true,
				ndaAcceptedAt: new Date().toISOString()
			});
		} catch {
			return fail(500, { error: 'Failed to record NDA acceptance. Please try again.' });
		}

		redirect(303, '/dashboard');
	}
};
