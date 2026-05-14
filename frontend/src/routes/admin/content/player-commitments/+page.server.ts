import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'player-commitments');
	return { saved: data ?? {} };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const players = [];
		for (let i = 0; i < 20; i++) {
			players.push({
				division:   fd.get(`player_${i}_division`)?.toString().trim()   ?? '',
				ranking:    fd.get(`player_${i}_ranking`)?.toString().trim()    ?? '',
				name:       fd.get(`player_${i}_name`)?.toString().trim()       ?? '',
				country:    fd.get(`player_${i}_country`)?.toString().trim()    ?? '',
				sponsor:    fd.get(`player_${i}_sponsor`)?.toString().trim()    ?? '',
				pdgaRating: fd.get(`player_${i}_pdgaRating`)?.toString().trim() ?? '',
				loiStatus:  fd.get(`player_${i}_loiStatus`)?.toString()         ?? 'pending',
				photoUrl:   fd.get(`player_${i}_photoUrl`)?.toString().trim()   ?? '',
				docId:      fd.get(`player_${i}_docId`)?.toString().trim()      ?? '',
				bioDocId:   fd.get(`player_${i}_bioDocId`)?.toString().trim()   ?? '',
			});
		}

		try {
			await upsertContentData(locals.pb, 'player-commitments', { players });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}

		return { success: true };
	}
};
