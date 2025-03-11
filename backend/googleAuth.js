const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider, signInWithPopup } = require("firebase/auth");
require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
};

// To test
// signInWithGoogle().then(user => console.log(user)).catch(console.error);

<<<<<<< HEAD
module.exports = { signInWithGoogle };
=======
module.exports = { signInWithGoogle, auth };
>>>>>>> main
