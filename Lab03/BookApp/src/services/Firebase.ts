import { initializeApp } from 'firebase/app';
import { getFirestore, writeBatch, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import books from '@/data/books.json';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC39j9uiQBp7VuTcprLqRjYg1pFiEqy-V0",
    authDomain: "reactnavtive-booksapp.firebaseapp.com",
    projectId: "reactnavtive-booksapp",
    storageBucket: "reactnavtive-booksapp.firebasestorage.app",
    messagingSenderId: "215082739731",
    appId: "1:215082739731:web:7024703a2c426fd139f7e6"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


const addMultipleBooks = async () => {

    const batch = writeBatch(FIREBASE_DB);

    books.forEach((book) => {

        const bookRef = doc(FIREBASE_DB, 'books', book.bookId);

        const bookData = {
            ...book
        }

        batch.set(bookRef, bookData);
    });
    console.log("Batch initiated");
    try {
        await batch.commit();
        console.log("batch successful");
    } catch (err) {
        console.log("batch failed: ", err);
    }
}

export { addMultipleBooks };
