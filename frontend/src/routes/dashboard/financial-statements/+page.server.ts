import { requirePageAccess } from '$lib/page-access';
import { getContentData } from '$lib/content-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('financial-statements', locals);
	const content = await getContentData(locals.pb, 'financial-statements');
	return { user: locals.user, content };
};
