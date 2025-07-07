import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";
import User from "@/types/User";


async function fetchUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();
        
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/me`, {
            method: 'GET',
            headers: {
                'Cookie': cookieHeader,
            },
            cache: 'no-store' // Ensure fresh data on each request
        });

        if (!request.ok) {
            if (request.status === 401 || request.status === 403) {
                // Handle unauthorized access - could redirect or return null
                return null;
            }
            throw new Error(`HTTP error! status: ${request.status}`);
        }

        const user: User = await request.json();
        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export default async function Header() {
    const user = await fetchUser();

    return (
      <HeaderClient
        user={user} // Pass user or null if not available
      />
    )
}