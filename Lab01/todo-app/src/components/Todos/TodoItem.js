import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTodo } from '../../Context/TodoContext';

function TodoItem({ item }) {

    const { updateTodoStatus, deleteTodo } = useTodo();

    const onSwitchPress = (todo) => {
        updateTodoStatus(todo);
    }

    const onDeletePress = (id) => {
        deleteTodo(id)
    }

    return (
        <View style={[styles.container, { backgroundColor: item.id % 2 !== 0 ? 'rgba(0,0,0,0.05)' : '#fff' }]}>
            <View style={styles.actionContainer}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <View style={styles.switchWrapper}>
                    <Text style={styles.switchText}>
                        Completed:
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#b7eb8f' }}
                        thumbColor={item.status ? '#389e0d' : '#f4f3f4'}
                        value={item.status}
                        onChange={() => onSwitchPress(item)}
                    />
                </View>
            </View>
            <View style={styles.statusContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.status}>
                        Status:
                    </Text>
                    <Text style={[styles.badge, {
                        backgroundColor: item.status ? "#f6ffed" : "#fff2e8",
                        color: item.status ? "#389e0d" : "#d4380d",
                        borderColor: item.status ? "#389e0d" : "#ffbb96"
                    }]}>
                        {item.status ? (
                            " done"
                        ) : (
                            " due"
                        )}
                    </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.deleteWrapper} onPress={() => onDeletePress(item.id)}>
                        <MaterialIcons name='delete-forever' size={20} color={'red'} />
                        <Text style={styles.deleteText}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10
    },
    actionContainer: {

    },
    switchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteText: {
        fontSize: 14,
        fontWeight: '600'
    },
    switchText: {
        fontSize: 14,
        fontWeight: '600'
    },
    statusContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.8)',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    status: {
        fontSize: 14,
        textAlign: 'start',
    },
    badge: {
        marginStart: 4,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.8)',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 4,
        textTransform: 'capitalize'
    }
})

export default TodoItem;