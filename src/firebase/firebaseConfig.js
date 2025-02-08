// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "anime-streaming-app-639d3.firebaseapp.com",
  projectId: "anime-streaming-app-639d3",
  storageBucket: "anime-streaming-app-639d3.firebasestorage.app",
  messagingSenderId: "306777210354",
  appId: "1:306777210354:web:eccf6da172750e48e03f6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage()