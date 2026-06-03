import type { PageServerLoad } from './$types';
import { requirePageAccess } from '$lib/page-access';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('dashboard', locals);
	return { user: locals.user };
};
