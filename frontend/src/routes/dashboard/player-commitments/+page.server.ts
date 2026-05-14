import { requirePageAccess } from '$lib/page-access';
import { getContentData } from '$lib/content-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('player-commitments', locals);
	const content = await getContentData(locals.pb, 'player-commitments');
	return { user: locals.user, content };
};
