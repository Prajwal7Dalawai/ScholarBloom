import React, { useState } from 'react';
import './auth.css';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student'); // Default to student

    const handleSignup = async (e) => {
        e.preventDefault();
        // Mock API call for signup
        const mockApiCall = async () => {
            // Simulate a successful signup response
            return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
        };

        const response = await mockApiCall();
        if (response.success) {
            // Handle successful signup (e.g., redirect or show a success message)
            console.log('Signup successful!');
        } else {
            // Handle signup failure (e.g., show an error message)
            console.log('Signup failed!');
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
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
                <div>
                    <label>User Type:</label>
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="university">University</option>
                    </select>
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;
