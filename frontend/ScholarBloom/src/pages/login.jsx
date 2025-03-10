import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from '../firebaseConfig';
import './auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // To store authenticated user info

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Email login functionality to be implemented later.');
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken(); // ✅ Get ID Token
    
            // 🔹 Send ID Token to backend
            const response = await fetch("http://localhost:3000/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }), // ✅ Send token
            });
    
            const data = await response.json();
            console.log("Login Successful:", data);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}!</p>
                    <img src={user.photoURL} alt="User Profile" />
                </div>
            ) : (
                <form className="login-form" onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleGoogleLogin}>Login with Google</button>
                </form>
            )}
        </div>
    );
};

export default LoginPage;
