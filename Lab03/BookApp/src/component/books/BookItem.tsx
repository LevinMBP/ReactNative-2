import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';

import { BookDTO } from '@/dto/Book.dto';
import { Colors } from '@/utility/colors';


const BookItem = ({ book, onPress }: { book: BookDTO, onPress: () => void }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.itemContainer}>

            <View style={styles.itemContent}>
                <Text style={styles.bookTitle}>{book.bookName}</Text>
                <Text style={styles.bookAuthor}>{book.authorName}</Text>
            </View>

            <View style={styles.availabilityContainer}>
                <View style={[styles.availability, book.isAvailable ? styles.available : styles.notAvailable]}                >
                    <Text style={styles.availabilityText}>
                        {book.isAvailable ? 'Available' : 'Not Available'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.lightPrimary,
        padding: 12,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: Colors.darkPrimary,
        borderWidth: 1,
        opacity: 1,
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
    itemContent: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 10,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.darkPrimary,
    },
    bookAuthor: {
        fontSize: 14,
        color: Colors.black,
    },
    availabilityContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 8,
    },
    availability: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    availabilityText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
    },
    available: {
        backgroundColor: Colors.green,
    },
    notAvailable: {
        backgroundColor: Colors.secondary,
    },
});

export default BookItem;