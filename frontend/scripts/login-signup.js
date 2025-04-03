// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "scholarbloom-ffaa4.firebaseapp.com",
  projectId: "scholarbloom-ffaa4",
  storageBucket: "scholarbloom-ffaa4.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXXXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Initialize Google Sign-In
function initGoogleSignIn() {
    // No need to initialize Google Sign-In as we're using Firebase
    console.log("Firebase initialized");
}

// Handle Google Sign-In
async function handleGoogleSignIn(userType) {
    try {
        // Sign in with Firebase
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // Get the ID token
        const idToken = await user.getIdToken();
        
        // Determine endpoint based on user type
        const endpoint = userType === "university" ? "/auth/google/university" : "/auth/google/student";
        
        // Send the token to the backend
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idToken })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Google Sign-In failed");
        }

        const data = await response.json();
        
        // Store the token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on user role
        if (data.user.role === "student") {
            window.location.href = "/student/dashboard";
        } else if (data.user.role === "university") {
            window.location.href = "/university/dashboard";
        }
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        alert(error.message);
    }
}

// Add event listeners to Google Sign-In buttons
document.addEventListener('DOMContentLoaded', function() {
    const studentGoogleBtn = document.getElementById("studentGoogleSignup");
    const universityGoogleBtn = document.getElementById("universityGoogleSignup");
    
    if (studentGoogleBtn) {
        studentGoogleBtn.addEventListener('click', () => handleGoogleSignIn("student"));
    }
    
    if (universityGoogleBtn) {
        universityGoogleBtn.addEventListener('click', () => handleGoogleSignIn("university"));
    }
});

// Initialize when the page loads
window.onload = initGoogleSignIn; 