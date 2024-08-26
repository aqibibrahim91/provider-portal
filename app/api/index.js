import { signOut } from "next-auth/react";

export async function apiClient(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (response.status === 401) {
            // Redirect to login page if 401 Unauthorized
            await signOut({
                redirect: "/secure/login", // Redirect to home or login page after sign-out
            });
            return;
        }

        return response;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
}