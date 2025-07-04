'use client';

import { useEffect, useState } from "react";

type User = {
    username?: string;
    // add other user properties if needed
};

export default function MeProfile() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const request = await fetch(`/api/me`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!request.ok) {
                console.log('Error fetching user data:', request, request.status);
            }
            if (request.status === 401 || request.status === 403) {
              window.location.href = '/login';
              return;
            }
            return request.json();
        };
        fetchUser().then((data) => {
            if (data) {
                setUser(data);
                console.log('User data:', data);
            } else {
                console.log('No user data found');
            }
        }).catch((error) => {
            console.error('Error in fetchUser:', error);
        });
    }, []);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-3xl font-bold">My Profile, {user?.username as string} </h1>
      <p className="text-lg">This is the profile page.</p>
      <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Edit Profile
      </button>
    </div>
  );
}