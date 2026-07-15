import type { PageServerLoad } from './$types';
import { requirePageAccess } from '$lib/page-access';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('grass-league', locals);
	return { user: locals.user };
};
