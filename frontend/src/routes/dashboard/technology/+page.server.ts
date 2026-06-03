import type { PageServerLoad } from './$types';
import { requirePageAccess } from '$lib/page-access';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('technology', locals);
	return { user: locals.user };
};
