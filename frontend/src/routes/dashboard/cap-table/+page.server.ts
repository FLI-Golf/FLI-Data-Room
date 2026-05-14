import { requirePageAccess } from '$lib/page-access';
import { getContentData } from '$lib/content-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('cap-table', locals);
	const content = await getContentData(locals.pb, 'cap-table');
	return { user: locals.user, content };
};
