import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(303, '/dashboard');
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();
		const passwordConfirm = data.get('passwordConfirm')?.toString();
		const name = data.get('name')?.toString();

		if (!email || !password || !passwordConfirm || !name) {
			return fail(400, { error: 'All fields are required.' });
		}

		if (password !== passwordConfirm) {
			return fail(400, { error: 'Passwords do not match.' });
		}

		try {
			await locals.pb.collection('users').create({
				email,
				password,
				passwordConfirm,
				name,
				// New users start with basic role; admin can upgrade
				role: 'basic',
				ndaAccepted: false,
				ndaAcceptedAt: null
			});

			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : 'Registration failed. Email may already be in use.';
			return fail(400, { error: message });
		}

		redirect(303, '/nda');
	}
};
