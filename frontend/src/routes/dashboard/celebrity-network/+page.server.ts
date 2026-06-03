import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { requirePageAccess } from '$lib/page-access';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('celebrity-network', locals);
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

	return {
		user: locals.user,
		hasAccess: true
	};
};
