'use client';
import User from "@/types/User";
import Link from "next/link";


export default function HeaderClient({ user }: { user: User | null }) {
    
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">My Blog</Link>
            </div>
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
    </header>
  );
}