import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDgjNWXN6OMxkN90r1y-hXxrk1XbvXgqbA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hw-lesson-18.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hw-lesson-18",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hw-lesson-18.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "587746711479",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:587746711479:web:7b960eba12c6dc49973a32",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export default db
