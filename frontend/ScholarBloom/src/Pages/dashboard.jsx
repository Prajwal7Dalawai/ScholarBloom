import { useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    fetch("http://localhost:3000/dashboard", {
        method: "GET",
        credentials: "include" })

            .then((res) => res.json())
            .then((data) => {
                if (data.user) setUser(data.user);
            })
            .catch(() => console.log("User not logged in"));
    }, []);

    return user ? <h1>Welcome, {user.name}</h1> : <h1>Please log in</h1>;
};

export default Dashboard;
