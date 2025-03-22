import React, { useState } from 'react';
import './login.css'; // Ensure this file is properly linked

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login attempted with:', { email, password });
    };

    const handleGoogleLogin = async () => {
        console.log('Google login attempted');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                
                {/* Email Input Field */}
                <div className="input-box">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                {/* Password Input Field */}
                <div className="input-box">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                {/* Login Button */}
                <button type="submit">Login</button>

                {/* Google Login Button */}
                <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                    Login with Google
                </button>

            </form>
        </div>
    );
};

export default LoginPage;
