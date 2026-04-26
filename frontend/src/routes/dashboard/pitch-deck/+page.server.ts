import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

	// Basic role sees a limited view; advanced/admin see the full deck
	return {
		user: locals.user,
		fullAccess: locals.user.role === 'advanced' || locals.user.role === 'admin'
	};
};
