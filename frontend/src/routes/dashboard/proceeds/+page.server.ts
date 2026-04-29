import { requirePageAccess } from '$lib/page-access';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('proceeds', locals);
	return { user: locals.user };
};
