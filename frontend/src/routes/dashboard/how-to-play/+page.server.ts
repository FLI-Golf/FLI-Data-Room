import { requirePageAccess } from '$lib/page-access';
import { getContentData } from '$lib/content-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('how-to-play', locals);
	const content = await getContentData(locals.pb, 'how-to-play');
	return { user: locals.user, content };
};
