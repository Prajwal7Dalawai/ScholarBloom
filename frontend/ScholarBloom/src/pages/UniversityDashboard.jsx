import React, { useEffect, useState } from 'react';

const UniversityDashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('idToken');
        if (token) {
            fetch("http://localhost:3000/user/data", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        } else {
            window.location.href = '/login'; // Redirect to login if not logged in
        }
    }, []);

    return (
        <div>
            <h1>Student Dashboard</h1>
            {userData ? (
                <div>
                    <h2>Welcome, {userData.name}</h2>
                    {/* Render user-specific data here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UniversityDashboard;
