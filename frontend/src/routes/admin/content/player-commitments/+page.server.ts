import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'player-commitments');
	return { saved: data ?? {} };
};

export const actions: Actions = {
	// Save a single player edit inline
	updatePlayer: async ({ locals, request }) => {
		const fd = await request.formData();
		const division   = fd.get('division')?.toString()          ?? '';
		const ranking    = fd.get('ranking')?.toString()           ?? '';
		const name       = fd.get('name')?.toString().trim()       ?? '';
		const country    = fd.get('country')?.toString().trim()    ?? '';
		const sponsor    = fd.get('sponsor')?.toString().trim()    ?? '';
		const pdgaRating = fd.get('pdgaRating')?.toString().trim() ?? '';
		const loiStatus  = fd.get('loiStatus')?.toString()         ?? 'pending';
		const photoUrl   = fd.get('photoUrl')?.toString().trim()   ?? '';
		const docId      = fd.get('docId')?.toString().trim()      ?? '';
		const bioDocId   = fd.get('bioDocId')?.toString().trim()   ?? '';

		const existing = await getContentData(locals.pb, 'player-commitments');
		const players: Record<string, string>[] = (existing?.players as Record<string, string>[]) ?? [];

		const updated = { division, ranking, name, country, sponsor, pdgaRating, loiStatus, photoUrl, docId, bioDocId };
		const idx = players.findIndex(p => p.division === division && p.ranking === ranking);
		if (idx >= 0) {
			players[idx] = updated;
		} else {
			players.push(updated);
		}

		try {
			await upsertContentData(locals.pb, 'player-commitments', { players });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}

		return { success: true, updated };
	}
};
