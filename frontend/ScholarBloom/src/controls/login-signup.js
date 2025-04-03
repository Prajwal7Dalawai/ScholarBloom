import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

export const handleGoogleSignIn = async (role, navigate) => {
    try {
        provider.setCustomParameters({ prompt: 'select_account' });
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();

        const response = await fetch(`http://localhost:3000/auth/google/${role === 'student' ? 'student' : 'university'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ idToken }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to sign in with Google");
        }

        // Store token and user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Set session cookie
        document.cookie = `session=${idToken}; path=/; max-age=3600; SameSite=Strict`;
        
        // Navigate based on role
        if(data.user.role === 'student') {
            navigate('/student');
        } else if(data.user.role === 'university') {
            navigate("/university");
        }
        
        return { data, role: data.user.role };
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw error;
    }
};

export const login = async (navigate) => {
    try {
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();

        const response = await fetch(`http://localhost:3000/auth/google/login`, {
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
        
        // Navigate based on role
        if(data.user.role === 'student') {
            navigate('/student');
        } else if(data.user.role === 'university') {
            navigate("/university");
        }
        
        return { data, role: data.user.role };
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch("http://localhost:3000/auth/logout", {
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
