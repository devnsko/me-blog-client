'use client';

async function logoutUser() {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
    }

    return response.json();
}

export default function LogoutPage() {
    try {
        const logout = async () => {
            const response = await logoutUser();
            if (response) {
                window.location.href = '/';
            }
        }
        logout();
    } catch (error) {
        console.error('Error during logout:', error);
        window.location.href = '/login?error=logout_failed';
    }
}