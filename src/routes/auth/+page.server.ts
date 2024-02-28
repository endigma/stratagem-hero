// src/routes/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate, type ErrorStatus } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const magicSchema = z.object({
	email: z.string().email()
});

const updatePasswordSchema = z.object({
	password: z
		.string()
		.min(10, { message: 'Password must be 10 characters' })
		.regex(/^(?=.*[a-z]).*$/, { message: 'Password must contain at least one lowercase character' })
		.regex(/^(?=.*[A-Z]).*$/, { message: 'Password must contain at least one uppercase character' })
		.regex(/^(?=.*[0-9]).*$/, { message: 'Password must contain at least one number' })
		.regex(/^(?=.*[!@#$&*]).*$/, { message: 'Password must contain symbol (!@#$&*)' })
});

const loginPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const load: PageServerLoad = async () => {
	const magicForm = await superValidate(zod(magicSchema));
	const updatePasswordForm = await superValidate(zod(updatePasswordSchema));
	const loginPasswordForm = await superValidate(zod(loginPasswordSchema));

	return { magicForm, updatePasswordForm, loginPasswordForm };
};

export const actions: Actions = {
	async magic({ request, locals: { supabase } }) {
		const form = await superValidate(request, zod(magicSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error: err } = await supabase.auth.signInWithOtp({
			email: form.data.email
		});
		if (err) {
			return message(form, err.message, { status: err.status as ErrorStatus });
		}

		return { form };
	},
	async updatePassword({ request, locals: { supabase } }) {
		const form = await superValidate(request, zod(updatePasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error: err } = await supabase.auth.updateUser({
			password: form.data.password
		});
		if (err) {
			return message(form, err.message, { status: err.status as ErrorStatus });
		}

		return { form };
	},
	async password({ request, locals: { supabase } }) {
		const form = await superValidate(request, zod(loginPasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error: err } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});
		if (err) {
			return message(form, err.message, { status: err.status as ErrorStatus });
		}

		return { form };
	},
	async logout({ locals: { supabase, getSession } }) {
		const session = await getSession();

		if (session) {
			await supabase.auth.signOut();
		}

		return redirect(303, '/');
	}
};
