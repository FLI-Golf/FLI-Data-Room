import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'inaugural-venue');
	return { saved: data ?? {} };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const venues = [];
		for (let i = 0; i < 2; i++) {
			const pros = (fd.get(`venue_${i}_pros`) as string ?? '').split('\n').map(s => s.trim()).filter(Boolean);
			const cons = (fd.get(`venue_${i}_cons`) as string ?? '').split('\n').map(s => s.trim()).filter(Boolean);
			venues.push({
				name:          fd.get(`venue_${i}_name`)?.toString().trim()          ?? '',
				location:      fd.get(`venue_${i}_location`)?.toString().trim()      ?? '',
				capacity:      fd.get(`venue_${i}_capacity`)?.toString().trim()      ?? '',
				ownership:     fd.get(`venue_${i}_ownership`)?.toString().trim()     ?? '',
				availability:  fd.get(`venue_${i}_availability`)?.toString().trim()  ?? '',
				estimatedCost: fd.get(`venue_${i}_estimatedCost`)?.toString().trim() ?? '',
				status:        fd.get(`venue_${i}_status`)?.toString().trim()        ?? '',
				photoUrl:      fd.get(`venue_${i}_photoUrl`)?.toString().trim()      ?? '',
				pros,
				cons,
				docId:         fd.get(`venue_${i}_docId`)?.toString().trim()         ?? '',
			});
		}

		try {
			await upsertContentData(locals.pb, 'inaugural-venue', { venues });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}

		return { success: true };
	}
};
