import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: 'rgba(0,0,0,0.8)',
        fontWeight: 'bold'
    }
})

export default Header