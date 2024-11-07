import React, { useEffect, useState } from 'react'
import { BookDTO } from '@/dto/Book.dto'
import BookItem from './BookItem'
import { FlatList, View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { useBooks } from '@/context/BookContext'
import { Colors } from '@/utility/colors'

const BooksList = ({ navigation }: { navigation: any }) => {
    const { books } = useBooks();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [books])

    // Cannot have book as parameter, because it is considered destructuring. DAMN TS
    const renderBookItem = ({ item }: { item: BookDTO }) => {
        return (
            <BookItem
                book={item}
                onPress={() => navigation.navigate('BookDetails', { book: item })}
            />
        )
    };

    return (
        <View style={styles.listContainer}>
            {loading ? (
                <ActivityIndicator size="large" color="#076a6a" style={styles.loadingIndicator} />
            ) : books.length === 0 ? (
                <Text style={styles.noBooksText}>No books available. Check back later!</Text>
            ) : (
                <FlatList
                    data={books}
                    renderItem={renderBookItem}
                    keyExtractor={(book) => book.bookId}
                />
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingTop: 16,
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


export default BooksList;