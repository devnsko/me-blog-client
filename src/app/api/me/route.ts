import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const jwt = req.cookies.get('jwt')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': jwt ? `Bearer ${jwt}` : '',
        },
    });

    if (!response.ok) {
        console.error('Error fetching user data:', response.status, response.statusText);
        const errorData = await response.text();
        return new Response(JSON.stringify({ message: errorData }), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const userData = await response.json();
    return new Response(JSON.stringify(userData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}