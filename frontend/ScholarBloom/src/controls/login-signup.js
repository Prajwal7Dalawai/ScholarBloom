import { auth, provider, signInWithPopup } from '../firebaseConfig';

const handleStudentSignin = async (navigate) => {
    try {
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken(); // ✅ Get ID Token

        // 🔹 Send ID Token to backend
        const response = await fetch("http://localhost:3000/auth/google/Studentsignin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }), // ✅ Send token
            credentials: "include",
        });

        const data = await response.json();
        console.log(data);

        // 🔹 Navigate to Dashboard if login is successful
        if (response.ok) {
            navigate("/studentDashboard"); // ✅ Navigate to dashboard
        } else {
            console.error("Login failed:", data.error);
        }

    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
};


const handleUniversitySignin = async (navigate) => {
    try {
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken(); // ✅ Get ID Token

        // 🔹 Send ID Token to backend
        const response = await fetch("http://localhost:3000/auth/google/UniSignin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }), // ✅ Send token
            credentials: "include",
        });

        const data = await response.json();
        console.log(data);

        // 🔹 Only navigate if the login is successful
        if (response.ok) {
            navigate("/university-dashboard"); // ✅ Redirect to dashboard
        } else {
            console.error("Login failed:", data.error);
        }

    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
};

const login = async(navigate) => {
    try {
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken(); // ✅ Get ID Token

        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }), // ✅ Send token
            credentials: "include",
        });

        const data = await response.json();
        console.log(data);
        const user = data.verifyEmail;
        if (response.ok) {
            if(user.role === "student"){
                navigate("/studentDashboard");
            }else{
                navigate("/university-dashboard");
            }
        } else {
            console.error("Login failed:", data.error);
        }
    } catch (error) {
        console.error("Login Error:", error);
    }
}

const logout = async () => {
    try {
        const response = await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        const data = await response.json();
        console.log(data);
        window.location.reload();
    } catch (error) {
        console.error("Logout Error:", error);
    }
}

export { handleStudentSignin, handleUniversitySignin, logout, login };
