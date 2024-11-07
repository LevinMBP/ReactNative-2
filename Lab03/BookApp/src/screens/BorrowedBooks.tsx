import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/utility/colors';
import BorrowedBookList from '@/component/books/BorrowedBookList';

const BorrowedBooks = () => {
    return (
        <View style={styles.container}>
            {/* <Button
                onPress={addMultipleBooks}
                title='Generate Books'
            /> */}
            <Text style={styles.headerText}>Borrowed Books</Text>

            <BorrowedBookList />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: Colors.darkPrimary,
    }
});

export default BorrowedBooks;