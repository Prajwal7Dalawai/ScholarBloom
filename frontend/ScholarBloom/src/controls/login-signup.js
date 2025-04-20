import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

export const handleGoogleSignIn = async (role, navigate) => {
    try {
        if (!role || !['student', 'university'].includes(role)) {
            throw new Error('Invalid role specified');
        }

        // Set custom parameters with a new nonce
        provider.setCustomParameters({
            prompt: 'select_account',
            nonce: Math.random().toString(36).substring(2)
        });
        
        const result = await signInWithPopup(auth, provider);
        if (!result.user) {
            throw new Error('No user data received from Google');
        }

        const idToken = await result.user.getIdToken();
        if (!idToken) {
            throw new Error('Failed to get ID token');
        }

        const endpoint = `https://scholarbloom-backend-142097269177.asia-south1.run.app/api/auth/google/${role}`;
        console.log(`Sending request to: ${endpoint}`);

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ 
                idToken,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Server response:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            throw new Error(errorData.error || `Failed to sign in as ${role}`);
        }

        const data = await response.json();
        if (!data.token || !data.user) {
            throw new Error('Invalid response data from server');
        }

        // Store token and user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Set session cookie with secure flags
        document.cookie = `session=${idToken}; path=/; max-age=3600; SameSite=Strict; Secure`;
        
        // Navigate based on role
        if (data.user.role === 'student') {
            navigate('/student');
        } else if (data.user.role === 'university') {
            navigate("/university");
        }
        
        return { data, role: data.user.role };
    } catch (error) {
        console.error("Google Sign-In Error:", {
            message: error.message,
            stack: error.stack,
            role: role
        });
        // Rethrow with more descriptive message
        throw new Error(`Failed to sign in with Google as ${role}: ${error.message}`);
    }
};

export const login = async () => {
    try {
        // Set custom parameters with a new nonce
        provider.setCustomParameters({
            prompt: "select_account",
            nonce: Math.random().toString(36).substring(2)
        });
        
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();

        const response = await fetch(`https://scholarbloom-backend-142097269177.asia-south1.run.app/api/auth/google/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ idToken }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to login with Google");
        }

        // Store token and user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Set session cookie
        document.cookie = `session=${idToken}; path=/; max-age=3600; SameSite=Strict`;
        
        return { 
            token: data.token,
            user: data.user,
            role: data.user.role
        };
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch("https://scholarbloom-backend-142097269177.asia-south1.run.app/api/auth/logout", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to logout");
        }

        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Clear session cookie
        document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        
        return true;
    } catch (error) {
        console.error("Logout Error:", error);
        throw error;
    }
};
