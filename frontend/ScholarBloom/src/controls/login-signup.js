import { auth, provider, signInWithPopup } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
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
        navigate("/dashboard");

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
        navigate("/dashboard");

    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
};

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

export { handleStudentSignin, handleUniversitySignin, logout };
