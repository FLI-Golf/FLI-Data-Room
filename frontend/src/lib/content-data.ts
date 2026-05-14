/**
 * Helpers for reading and writing structured content data stored in PocketBase.
 *
 * Each of the 9 new investor sections stores its data as a single JSON record
 * in the `content_data` collection, keyed by `slug`. The dashboard pages read
 * from this collection and fall back to placeholder values when no record exists.
 *
 * PocketBase collection schema required:
 *   content_data
 *     slug    (text, unique)
 *     payload (json)
 */

import type PocketBase from 'pocketbase';

export interface ContentRecord {
	id: string;
	slug: string;
	payload: Record<string, unknown>;
}

export async function getContentData(
	pb: PocketBase,
	slug: string
): Promise<Record<string, unknown> | null> {
	try {
		const record = await pb
			.collection('content_data')
			.getFirstListItem<ContentRecord>(`slug="${slug}"`);
		return record.payload ?? null;
	} catch {
		return null;
	}
}

export async function upsertContentData(
	pb: PocketBase,
	slug: string,
	payload: Record<string, unknown>
): Promise<void> {
	let existing: ContentRecord | null = null;
	try {
		existing = await pb
			.collection('content_data')
			.getFirstListItem<ContentRecord>(`slug="${slug}"`);
	} catch {
		// Record doesn't exist yet — will create below
	}

	if (existing) {
		await pb.collection('content_data').update(existing.id, { payload });
	} else {
		console.log('[upsertContentData] creating new record for slug:', slug);
		await pb.collection('content_data').create({ slug, payload });
	}
}
