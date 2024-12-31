import { type NextRequest, NextResponse } from 'next/server';
import { createClient, updateSession } from '@workspace/auth/utils/middleware';

export const checkIfUserLoggedIn = async (request: NextRequest) => {
    const { supabase, response } = createClient(request);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const exemptedPaths = ['/login', '/signup', '/reset-password'];

    if(!user && !exemptedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    }
    return response;
};

export async function middleware(request: NextRequest) {
    const loginCheckResponse = await checkIfUserLoggedIn(request);
    if (loginCheckResponse) {
        return loginCheckResponse;
    }
    return await updateSession(request);
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};