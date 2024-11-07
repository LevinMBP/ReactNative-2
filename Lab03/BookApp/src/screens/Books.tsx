import BooksList from '@/component/books/BooksList';
import { Colors } from '@/utility/colors';
import { addMultipleBooks } from '@/services/Firebase';
import { View, Text, StyleSheet, Button } from 'react-native';

const Books = ({ navigation }: { navigation: any }) => {

    return (
        <View style={styles.container}>
            {/* <Button
                onPress={addMultipleBooks}
                title='Generate Books'
            /> */}
            <Text style={styles.headerText}>Book Library</Text>

            <BooksList
                navigation={navigation}
            />
        </View>
    )
}

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

export default Books