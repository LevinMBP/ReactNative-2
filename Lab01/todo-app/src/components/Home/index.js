import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TodoList from '../Todos/TodoList';
import PrimaryButton from '../Utilities/PrimaryButton';
import { useTodo } from '../../Context/TodoContext';

function Home({ navigation }) {

    const { todos } = useTodo();

    const onAddTask = () => {
        navigation.navigate('AddTodo');
    }

    return (
        <View style={styles.container}>
            <TodoList todos={todos} setter={() => { }} />

            <PrimaryButton extraStyles={{ marginBottom: 10 }} handlePress={onAddTask} buttonText={"Add Todo"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Home