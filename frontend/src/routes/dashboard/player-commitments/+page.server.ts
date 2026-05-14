import { fail } from '@sveltejs/kit';
import { requirePageAccess } from '$lib/page-access';
import { getContentData, upsertContentData } from '$lib/content-data';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('player-commitments', locals);
	const content = await getContentData(locals.pb, 'player-commitments');
	return { user: locals.user, content };
};

export const actions: Actions = {
	updatePlayer: async ({ locals, request }) => {
		if (locals.user?.role !== 'admin') {
			return fail(403, { error: 'Admin only.' });
		}

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

		const idx = players.findIndex(p => p.division === division && p.ranking === ranking);
		const updated = { division, ranking, name, country, sponsor, pdgaRating, loiStatus, photoUrl, docId, bioDocId };

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

		return { success: true, updated: `${division} ${ranking}` };
	}
};
