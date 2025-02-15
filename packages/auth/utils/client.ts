import { createBrowserClient } from "@supabase/ssr";

// Supabase client for client-side operations
export const createClient = () =>
	createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
