import { BookDTO, BorrowedBookDTO } from '@/dto/Book.dto';
import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Text, FlatList, Platform, ActivityIndicator } from 'react-native';
import { Colors } from '@/utility/colors';
import { useBooks } from '@/context/BookContext';

const BorrowedBookList = () => {
    const { borrowedBooks, removeBookToBorrowed } = useBooks();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [borrowedBooks])

    const renderItem = ({ item }: { item: BorrowedBookDTO }) => {
        return (
            <View style={styles.bookItem}>
                <Image source={{ uri: item.coverPage }} style={styles.coverImage} />
                <View style={styles.bookDetails}>
                    <Text style={styles.bookTitle}>{item.bookName}</Text>
                    <Text style={styles.bookAuthor}>{item.authorName}</Text>
                    <TouchableOpacity
                        style={styles.returnButton}
                        onPress={() => handleReturnBook(item)}
                    >
                        <Text style={styles.returnButtonText}>Return Book</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    const handleReturnBook = (bookBorrowedId: BorrowedBookDTO) => {
        removeBookToBorrowed(bookBorrowedId);
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#076a6a" style={styles.loadingIndicator} />
            ) : borrowedBooks.length === 0 ? (
                <Text style={styles.noBooksText}>No borrowed books yet! Time to explore.</Text>
            ) : (
                <FlatList
                    data={borrowedBooks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.bookId}
                />
            )}

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    bookItem: {
        flexDirection: 'row',
        backgroundColor: Colors.lightPrimary,
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.darkPrimary,
        shadowColor: Colors.black,
        // Adds shadow for better UI Android
        elevation: 3,
        ...Platform.select({
            ios: {
                // iOS shadow
                shadowColor: Colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            }
        })
    },
    coverImage: {
        width: 60,
        height: 90,
        borderRadius: 6,
        marginRight: 12,
    },
    bookDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.darkPrimary,
    },
    bookAuthor: {
        fontSize: 14,
        color: Colors.black,
        marginBottom: 8,
    },
    returnButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    returnButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    noBooksText: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.primary,
        marginTop: 20,
    },
    loadingIndicator: {
        marginTop: 40,
    },
});

export default BorrowedBookList;