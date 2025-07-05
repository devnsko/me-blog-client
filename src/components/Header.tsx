import Link from "next/link";
import { cookies } from "next/headers";

type User = {
    username?: string;
    // add other user properties if needed
};

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

        return await request.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export default async function Header() {
    const user = await fetchUser();
    
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">My Blog</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex">
              {user ? (
                <>
                  <Link href="/me" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Profile ({user.username})
                  </Link>
                  <Link href="/logout" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link href="/signup" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}