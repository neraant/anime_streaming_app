// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "anime-streaming-app-f3795.firebaseapp.com",
  projectId: "anime-streaming-app-f3795",
  storageBucket: "anime-streaming-app-f3795.firebasestorage.app",
  messagingSenderId: "980643407923",
  appId: "1:980643407923:web:48ec278620c930434b1b46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage()