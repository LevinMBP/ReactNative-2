import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function PrimaryButton({ extraStyles, handlePress, buttonText, buttonBgColor, disabled = false }) {
    return (
        <View style={[styles.container, extraStyles]}>
            <TouchableOpacity
                style={[styles.addButton, buttonBgColor]}
                onPress={handlePress}
                disabled={disabled}
            >
                <Text style={styles.addButtonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 5
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default PrimaryButton