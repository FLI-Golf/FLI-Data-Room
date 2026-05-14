import { requirePageAccess } from '$lib/page-access';
import { getContentData } from '$lib/content-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('financial-projections', locals);
	const content = await getContentData(locals.pb, 'financial-projections');
	return { user: locals.user, content };
};
