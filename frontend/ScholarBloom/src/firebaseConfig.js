import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// 🔹 Ensure environment variables are correctly accessed
const firebaseConfig = {
    apiKey: "AIzaSyDREM-fC7H8uyrbV6ar9BUNZknm7iBT8S0",
    authDomain: "scholarbloom-ffaa4.firebaseapp.com",
    projectId: "scholarbloom-ffaa4"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
