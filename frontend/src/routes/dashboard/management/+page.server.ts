import { requirePageAccess } from '$lib/page-access';
import { getContentData } from '$lib/content-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('management', locals);
	const content = await getContentData(locals.pb, 'management');
	return { user: locals.user, content };
};
