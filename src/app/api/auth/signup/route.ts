import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export async function POST(req: NextRequest) {
    const { username, email, password } = await req.json();
    const appUserRoles = ['ROLE_CLIENT']; // Default roles for the app user
    const backendRes = await fetch(`${BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, appUserRoles }),
        credentials: 'include',
    });
    if (!backendRes.ok) {
        console.error('Error during signup:', backendRes.status, backendRes.statusText);
        const errorData = await backendRes.json();
        return new NextResponse(JSON.stringify({ message: errorData.message, errors: errorData.errors }), {
            status: backendRes.status,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    console.log('Signup successful, response:', backendRes);
    const token = await backendRes.text();
    console.log(`token: ${token}`);
    const res = NextResponse.json({ registered: true }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    res.cookies.set('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
}