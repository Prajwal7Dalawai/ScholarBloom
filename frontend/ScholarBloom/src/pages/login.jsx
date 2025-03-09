import React, { useState } from 'react';
import './auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Mock API call for login
        const mockApiCall = async () => {
            // Simulate a successful login response
            return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
        };

        const response = await mockApiCall();
        if (response.success) {
            // Handle successful login (e.g., redirect or show a success message)
            console.log('Login successful!');
        } else {
            // Handle login failure (e.g., show an error message)
            console.log('Login failed!');
        }
    };

    const handleGoogleLogin = async () => {
        // Mock Google OAuth login
        const mockGoogleLogin = async () => {
            // Simulate a successful Google login response
            return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
        };

        const response = await mockGoogleLogin();
        if (response.success) {
            // Handle successful Google login (e.g., redirect or show a success message)
            console.log('Google login successful!');
        } else {
            // Handle Google login failure (e.g., show an error message)
            console.log('Google login failed!');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
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
        </div>
    );
};

export default LoginPage;
