import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }

    .login-container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        width: 300px;
    }

    h2 {
        margin-bottom: 20px;
        color: #333;
    }

    .login-form div {
        margin-bottom: 15px;
        text-align: left;
    }

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
        color: #555;
    }

    input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
    }

    button {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        font-size: 16px;
        cursor: pointer;
        margin-top: 10px;
    }

    button:hover {
        background-color: #0056b3;
    }

    button[type="button"] {
        background-color: #db4437;
    }

    button[type="button"]:hover {
        background-color: #b53122;
    }
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const mockApiCall = async () => {
            return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
        };
        const response = await mockApiCall();
        if (response.success) {
            console.log('Login successful!');
        } else {
            console.log('Login failed!');
        }
    };

    const handleGoogleLogin = async () => {
        const mockGoogleLogin = async () => {
            return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
        };
        const response = await mockGoogleLogin();
        if (response.success) {
            console.log('Google login successful!');
        } else {
            console.log('Google login failed!');
        }
    };

    return (
        <>
            <GlobalStyle />
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
        </>
    );
};

export default LoginPage;
