import { auth, provider, signInWithPopup } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
const handleStudentSignin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
       const idToken = await result.user.getIdToken(); // ✅ Get ID Token

        // 🔹 Send ID Token to backend
        const response = await fetch("http://localhost:3000/auth/google/Studentsignin", {
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

const handleUniversitySignin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
       const idToken = await result.user.getIdToken(); // ✅ Get ID Token

        // 🔹 Send ID Token to backend
        const response = await fetch("http://localhost:3000/auth/google/UniSignin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }), // ✅ Send token
        });
        const data = await response.json();// Store user info in state
        console.log("Login Successful:", data);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
};

export { handleStudentSignin, handleUniversitySignin };
