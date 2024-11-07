import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { Colors } from '@/utility/colors';
import { useBooks } from '@/context/BookContext';

function BookDetails({ route, navigation }: { route: any, navigation: any }) {
    const { book } = route.params;
    const { addBookToBorrowed, maxBooks } = useBooks();
    const [borrowing, setBorrowing] = useState(false);

    useEffect(() => {
        if (book) {
            // Change Navigation Title based on bookname
            navigation.setOptions({
                title: book.bookName,
            });
        }
    }, [book, navigation])

    const handleBorrowBook = async () => {
        if (book.isAvailable) {
            setBorrowing(true);
            try {
                await addBookToBorrowed(book);
                Alert.alert('Success', `${book.bookName} has been borrowed!`, [
                    { text: 'OK', onPress: () => navigation.goBack() }, // Optionally navigate back
                ]);
                setTimeout(() => {
                    setBorrowing(false);
                }, 1000);
            }
            catch (err) {
                Alert.alert('Error', 'Something went wrong while borrowing the book.', [
                    { text: 'OK' },
                ]);
                setBorrowing(false);
                console.log(err);
            }
        } else {
            Alert.alert('Unavailable', 'This book is not available for borrowing.', [
                { text: 'OK' },
            ]);
            setBorrowing(false);
        }
    };

    return (

        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: book.coverPage }}
                style={styles.coverImage}
                resizeMode="contain"
            />
            <Text style={styles.bookTitle}>{book.bookName}</Text>
            <Text style={styles.bookAuthor}>{book.authorName}</Text>
            <View style={styles.ratingContainer}>
                <Text style={styles.bookRating}>Rating: {book.rating} / 5</Text>
            </View>
            <Text style={styles.bookSummary}>{book.briefSummary}</Text>

            <View style={styles.floatingButtonContainer}>
                {book.isAvailable ? (
                    maxBooks === 3 || maxBooks > 3 ? (
                        <View style={styles.borrowedMessage}>
                            <Text style={styles.borrowedText}>You have reached maximum books to borrow.</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.floatingButton}
                            onPress={handleBorrowBook}
                            disabled={borrowing}
                        >
                            <Text style={styles.borrowButtonText}>
                                {borrowing ? "Borrowing..." : "Borrow Book"}
                            </Text>
                        </TouchableOpacity>
                    )
                ) : (
                    <View style={styles.borrowedMessage}>
                        <Text style={styles.borrowedText}>This book is not available for borrowing.</Text>
                    </View>
                )}
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.white,
    },
    coverImage: {
        width: '100%',
        height: 300,
        borderRadius: 15,
        marginBottom: 15,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    bookTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.darkPrimary,
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.secondary,
        marginBottom: 10,
    },
    ratingContainer: {
        marginBottom: 15,
    },
    bookRating: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.darkPrimary,
    },
    bookSummary: {
        fontSize: 16,
        color: Colors.gray,
        lineHeight: 22,
        textAlign: 'justify',
    },
    // Floating button style
    floatingButtonContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 20 : 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        height: 80,
        borderTopColor: Colors.gray,
        borderTopWidth: 0.25,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0
    },
    floatingButton: {
        marginStart: 20,
        marginEnd: 20,
        marginTop: 10,
        backgroundColor: Colors.green,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // Add shadow for Android
        elevation: 5,
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
    borrowButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    borrowedMessage: {
        marginStart: 20,
        marginEnd: 20,
        marginTop: 10,
        paddingVertical: 14,
        backgroundColor: Colors.lightPrimary,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    borrowedText: {
        color: Colors.darkPrimary,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});


export default BookDetails;