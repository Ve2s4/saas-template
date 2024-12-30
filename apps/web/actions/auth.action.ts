"use server";

import { createClient } from "@workspace/auth/utils/server";

export async function handleEmailPassLoginAction(email: string, pass: string) {
	const supabase = createClient();
	const { error, data } = await supabase.auth.signUp({
		email,
		password: pass,
	});

	console.log(error, data);
}
