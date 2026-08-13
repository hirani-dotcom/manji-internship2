import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPm18Ku61cDPvtEymkJmC-kWZ76hFR61o",
    authDomain: "summarist-440e0.firebaseapp.com",
    projectId: "summarist-440e0",
    storageBucket: "summarist-440e0.firebasestorage.app",
    messagingSenderId: "780323235301",
    appId: "1:780323235301:web:644fac480c3439a5aa3b0c",
};

const app = (!getApps().length) ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
