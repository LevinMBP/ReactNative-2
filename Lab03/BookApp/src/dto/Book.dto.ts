

export interface BookDTO {
    bookId: string;
    bookName: string;
    coverPage: string;
    authorName: string;
    rating: number;
    briefSummary: string;
    isAvailable: boolean;
}

export interface BookListDTO {
    books: BookDTO[];
}

// Borrowed Book DTO (extended with dates)
export interface BorrowedBookDTO extends BookDTO {
    // ID of the user who borrowed the book
    borrowedBy: string;
    borrowedDate: Date;
    maxReturnDate: Date;
    returnedDate?: Date;
    bookBorrowedId: string;
}

export interface BookContextType {
    books: BookDTO[];
    borrowedBooks: BorrowedBookDTO[];
    maxBooks: number;
    setBooks: (books: BookDTO[]) => void;
    setBorrowedBooks: (borrowedBooks: BorrowedBookDTO[]) => void;
    addBookToBorrowed: (book: BookDTO) => Promise<void>;
    removeBookToBorrowed: (id: BorrowedBookDTO) => void;
}