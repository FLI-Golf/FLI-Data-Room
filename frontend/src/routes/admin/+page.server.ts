import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import type { User } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	const users = await locals.pb.collection('users').getFullList<User>({ sort: 'created' });
	return { users };
};

export const actions: Actions = {
	updateRole: async ({ locals, request }) => {
		const data = await request.formData();
		const userId = data.get('userId')?.toString();
		const role = data.get('role')?.toString();

		if (!userId || !role) return fail(400, { error: 'Missing fields.' });
		if (!['basic', 'advanced', 'admin'].includes(role)) return fail(400, { error: 'Invalid role.' });

		try {
			await locals.pb.collection('users').update(userId, { role });
		} catch {
			return fail(500, { error: 'Failed to update role.' });
		}
	},

	revokeAccess: async ({ locals, request }) => {
		const data = await request.formData();
		const userId = data.get('userId')?.toString();
		if (!userId) return fail(400, { error: 'Missing user ID.' });

		try {
			await locals.pb.collection('users').update(userId, {
				ndaAccepted: false,
				ndaAcceptedAt: null
			});
		} catch {
			return fail(500, { error: 'Failed to revoke access.' });
		}
	}
};
