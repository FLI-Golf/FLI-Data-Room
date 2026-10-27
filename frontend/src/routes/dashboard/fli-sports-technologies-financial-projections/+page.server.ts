import type { PageServerLoad } from './$types';
import { requirePageAccess } from '$lib/page-access';
import { loadSportsProjections, SPORTS_PROJECTIONS_SOURCE } from '$lib/server/sports-projections';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('fg-sports-technologies', locals);
	return {
		sportsProjections: await loadSportsProjections(),
		sportsProjectionsSource: SPORTS_PROJECTIONS_SOURCE
	};
};