import { fail } from '@sveltejs/kit';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

interface PageAccess {
	id: string;
	slug: string;
	label: string;
	role: 'basic' | 'advanced' | 'admin';
	group: string;
}

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
		`${PUBLIC_POCKETBASE_URL}/api/collections/page_access/records?perPage=200&sort=group,label`,
		{ headers: { Authorization: token } }
	);
	const json = await res.json();
	return { pages: (json.items ?? []) as PageAccess[] };
};

export const actions: Actions = {
	updateRole: async ({ request }) => {
		const data = await request.formData();
		const id   = data.get('id')?.toString();
		const role = data.get('role')?.toString();

		if (!id || !role) return fail(400, { error: 'Missing fields.' });
		if (!['basic', 'advanced', 'admin'].includes(role)) return fail(400, { error: 'Invalid role.' });

		try {
			const token = await getSuperuserToken();
			const res = await fetch(`${PUBLIC_POCKETBASE_URL}/api/collections/page_access/records/${id}`, {
				method: 'PATCH',
				headers: { Authorization: token, 'Content-Type': 'application/json' },
				body: JSON.stringify({ role })
			});
			if (!res.ok) return fail(500, { error: 'Failed to update.' });
		} catch {
			return fail(500, { error: 'Failed to update.' });
		}
	}
};
