import type { EmailOtpType } from '@supabase/supabase-js';
import { error, redirect, type NumericRange } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	const token_hash = url.searchParams.get('token_hash') as string;
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = url.searchParams.get('next') ?? '/';

	if (!token_hash || !type) {
		error(400, 'Bad Request');
	}

	const { error: err } = await supabase.auth.verifyOtp({ token_hash, type });
	if (err) {
		error(err.status as NumericRange<400, 599>, err.message);
	}

	redirect(303, `/${next.slice(1)}`);
};
