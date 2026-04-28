import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';
import type { User } from '$lib/types';

async function getSuperuserToken(): Promise<string> {
	const res = await fetch(
		`${PUBLIC_POCKETBASE_URL}/api/collections/_superusers/auth-with-password`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ identity: POCKETBASE_ADMIN_EMAIL, password: POCKETBASE_ADMIN_PASSWORD })
		}
	);
	if (!res.ok) throw new Error(`Superuser auth failed: ${res.status}`);
	const json = await res.json();
	return json.token as string;
}

export const load: PageServerLoad = async () => {
	const token = await getSuperuserToken();
	const res = await fetch(
		`${PUBLIC_POCKETBASE_URL}/api/collections/users/records?perPage=500&sort=created`,
		{ headers: { Authorization: token } }
	);
	const json = await res.json();
	return { users: (json.items ?? []) as User[] };
};

export const actions: Actions = {
	updateRole: async ({ request }) => {
		const data = await request.formData();
		const userId = data.get('userId')?.toString();
		const role = data.get('role')?.toString();

		if (!userId || !role) return fail(400, { error: 'Missing fields.' });
		if (!['basic', 'advanced', 'admin'].includes(role)) return fail(400, { error: 'Invalid role.' });

		try {
			const token = await getSuperuserToken();
			const res = await fetch(`${PUBLIC_POCKETBASE_URL}/api/collections/users/records/${userId}`, {
				method: 'PATCH',
				headers: { Authorization: token, 'Content-Type': 'application/json' },
				body: JSON.stringify({ role })
			});
			if (!res.ok) return fail(500, { error: 'Failed to update role.' });
		} catch {
			return fail(500, { error: 'Failed to update role.' });
		}
	},

	revokeAccess: async ({ request }) => {
		const data = await request.formData();
		const userId = data.get('userId')?.toString();
		if (!userId) return fail(400, { error: 'Missing user ID.' });

		try {
			const token = await getSuperuserToken();
			const res = await fetch(`${PUBLIC_POCKETBASE_URL}/api/collections/users/records/${userId}`, {
				method: 'PATCH',
				headers: { Authorization: token, 'Content-Type': 'application/json' },
				body: JSON.stringify({ ndaAccepted: false, ndaAcceptedAt: null })
			});
			if (!res.ok) return fail(500, { error: 'Failed to revoke access.' });
		} catch {
			return fail(500, { error: 'Failed to revoke access.' });
		}
	}
};
