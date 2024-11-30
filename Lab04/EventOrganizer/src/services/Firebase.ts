// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, addDoc, setDoc, updateDoc, getDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDNj0aUb7tC9QNiOBNsmJeMktvGFaLrpE",
    authDomain: "eventorganizerapp-206a3.firebaseapp.com",
    projectId: "eventorganizerapp-206a3",
    storageBucket: "eventorganizerapp-206a3.firebasestorage.app",
    messagingSenderId: "133402259263",
    appId: "1:133402259263:web:a63ea50a19274c5afead8a"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export { doc, addDoc, setDoc, updateDoc, getDoc, collection, createUserWithEmailAndPassword, signInWithEmailAndPassword }