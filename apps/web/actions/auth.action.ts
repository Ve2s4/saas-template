"use server";

import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@workspace/auth/utils/server";
import { redirect } from "next/navigation";

export async function sendOtpViaEmail(email: string): Promise<{
	error: string | undefined;
	data: { user: User | null; session: Session | null };
}> {
	const supabase = createClient();
	const { error, data } = await supabase.auth.signInWithOtp({ email });

	return {
		error: error?.message,
		data: data,
	};
}

export async function verifyOtp(
	otp: string,
	email: string,
): Promise<{
	error: string | undefined;
	data: { user: User | null; session: Session | null };
}> {
	const supabase = createClient();
	const { error, data } = await supabase.auth.verifyOtp({
		email,
		token: otp,
		type: "email",
	});

	return {
		error: error?.message,
		data: data,
	};
}

export async function signOut(): Promise<void> {
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();

	if (!error) {
		redirect("/login");
	}
}
