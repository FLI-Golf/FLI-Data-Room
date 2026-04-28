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

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required.' });
		}

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch {
			return fail(401, { error: 'Invalid email or password.' });
		}

		const user = locals.pb.authStore.model;

		// Route based on role and NDA status
		if (user?.role === 'admin') {
			redirect(303, '/admin');
		}

		if (!user?.ndaAccepted) {
			redirect(303, '/nda');
		}

		redirect(303, '/dashboard');
	}
};
