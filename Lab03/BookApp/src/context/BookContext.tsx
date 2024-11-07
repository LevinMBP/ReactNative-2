import { BookContextType, BookDTO, BookListDTO, BorrowedBookDTO } from '@/dto/Book.dto';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

// Firebase
import { FIREBASE_DB as db } from '@/services/Firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';


// Type for the props of BookProvider, specifically `children` prop
interface BookProviderProps {
    children: ReactNode;
}

const BookContext = createContext<BookContextType | undefined>(undefined);


export const useBooks = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBooks must be used within BookProvider');
    }
    return context;
}

const BookProvider: FC<BookProviderProps> = ({ children }) => {
    const [books, setBooks] = useState<BookDTO[]>([]);
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBookDTO[]>([]);
    const [maxBooks, setMaxBooks] = useState(borrowedBooks.length);

    const fetchBooks = async () => {
        try {
            const subscribeBooks = onSnapshot(collection(db, 'books'),
                (snapshot) => {
                    const booksList: BookDTO[] = [];

                    snapshot.forEach((doc) => {
                        const data = doc.data();

                        booksList.push({
                            bookId: doc.id,
                            bookName: data.bookName,
                            coverPage: data.coverPage,
                            authorName: data.authorName,
                            rating: data.rating,
                            briefSummary: data.briefSummary,
                            isAvailable: data.isAvailable
                        });
                    });

                    setBooks(booksList);
                }
            );

            // Clean up
            return subscribeBooks;
        }
        catch (err) {
            console.log("Fetch fail :", err);
        }
    }

    const fetchBorrowedBooks = async () => {
        try {
            console.log("Setting up snapshot listener...");

            const subscribe = onSnapshot(collection(db, 'borrowedBooks'),
                (snapshot) => {

                    const borrowedBookList: BorrowedBookDTO[] = [];

                    snapshot.forEach((doc) => {
                        const data = doc.data();

                        borrowedBookList.push({
                            bookId: data.bookId,
                            bookName: data.bookName,
                            coverPage: data.coverPage,
                            authorName: data.authorName,
                            rating: data.rating,
                            briefSummary: data.briefSummary,
                            isAvailable: data.isAvailable,

                            bookBorrowedId: doc.id,
                            borrowedBy: data.borrowedBy,
                            borrowedDate: data.borrowedDate.toDate(),  // Convert Firestore Timestamp to JS Date
                            maxReturnDate: data.maxReturnDate.toDate(),  // Convert Firestore Timestamp to JS Date
                            returnedDate: data.returnedDate ? data.returnedDate.toDate() : null, //
                        })
                    });

                    setBorrowedBooks(borrowedBookList);
                    setMaxBooks(borrowedBookList.length);

                    // Log metadata to check for pending writes
                    console.log("Snapshot metadata:", snapshot.metadata);
                });

            return subscribe;
        }
        catch (err) {
            console.log(err)
        }
    };

    const addBookToBorrowed = async (book: BookDTO) => {
        if (!book.isAvailable) {
            console.log("This book is already been borrowed.");
            return;
        }

        const borrowedBook = {
            ...book,
            borrowedBy: 'dummy_user0001',
            borrowedDate: new Date(),
            maxReturnDate: new Date(new Date().setDate(new Date().getDate() + 15)), // Assuming 15 days as max borrow time
        }

        try {
            // Add book to borrowedBooks
            const bookBorrowRef = await addDoc(collection(db, 'borrowedBooks'), borrowedBook);
            console.log("Borrowed Successfully :", bookBorrowRef.id);
        }
        catch (err) {
            console.log("Something went wrong when adding book to borrowedBooks");
        }

        // Updates book availability
        updateBookAvailability(book.bookId, false);
    };

    const removeBookToBorrowed = async (borrowedBook: BorrowedBookDTO) => {
        const bookId = borrowedBook.bookId;
        const borrowedBookId = borrowedBook.bookBorrowedId;
        try {
            await deleteDoc(doc(db, 'borrowedBooks', borrowedBookId));
        }
        catch (err) {
            console.log("Error returning book ", err);
        }

        // Updates book availability
        updateBookAvailability(bookId, true);
    }

    const updateBookAvailability = async (bookId: string, isAvailable: boolean) => {
        try {
            // Update book availability in FIRESTORE DB
            const bookRef = doc(db, 'books', bookId);
            await updateDoc(bookRef, {
                isAvailable: isAvailable
            });
            console.log("Book updated successfully");
        }
        catch (err) {
            console.log("Something went wrong when updating book availability");
        }
    }

    useEffect(() => {
        fetchBooks();
        fetchBorrowedBooks();
    }, [])


    return (
        <BookContext.Provider value={{ books, borrowedBooks, maxBooks, removeBookToBorrowed, setBooks, setBorrowedBooks, addBookToBorrowed }}>
            {children}
        </BookContext.Provider>
    )
}

export { BookProvider };