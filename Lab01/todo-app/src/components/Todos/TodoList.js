import { FlatList, StyleSheet, Text, View } from 'react-native';
import TodoItem from './TodoItem';
import Separator from '../Utilities/Separator';

function TodoList({ todos }) {
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={todos}
                renderItem={(item) => <TodoItem item={item.item} />}
                ItemSeparatorComponent={Separator}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})

export default TodoList