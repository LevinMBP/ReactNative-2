import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import PrimaryButton from '../Utilities/PrimaryButton';
import { useTodo } from '../../Context/TodoContext';

function AddTodo({ navigation }) {
    const { addTodo } = useTodo();
    const [title, setTitle] = useState('');

    const onSaveTodo = () => {
        let trimmed = title?.trim();
        if (trimmed === '') {
            return
        }
        else {
            addTodo(title);
            setTitle('');
            navigation.navigate('Home')
        }
    }

    return (
        <View>
            <Text style={styles.text}>Todo Title:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder='Enter Title'
            />

            <PrimaryButton
                buttonText={"Save"}
                extraStyles={{ marginHorizontal: 12 }}
                buttonBgColor={{ backgroundColor: title.trim() === '' ? 'rgba(0,0,0,0.3)' : '#007bff' }}
                disabled={title.trim() === ''}
                handlePress={onSaveTodo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginTop: 5,
        marginHorizontal: 12,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        marginStart: 12,
        marginTop: 10
    }
})

export default AddTodo