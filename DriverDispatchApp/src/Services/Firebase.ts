import { initializeApp } from "firebase/app";
import { doc, addDoc, setDoc, updateDoc, getDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBggzejmlEwut_2Amop1IS1AVHlBzLAs8",
    authDomain: "reactnative-driverdispatchapp.firebaseapp.com",
    projectId: "reactnative-driverdispatchapp",
    storageBucket: "reactnative-driverdispatchapp.firebasestorage.app",
    messagingSenderId: "316468180706",
    appId: "1:316468180706:web:5a56db9a54e34c917190bb"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


export { doc, addDoc, setDoc, updateDoc, getDoc, collection, createUserWithEmailAndPassword, signInWithEmailAndPassword }