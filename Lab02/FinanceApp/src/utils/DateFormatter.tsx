import React from 'react'
import { Text, StyleSheet } from 'react-native'


interface DateFormatterProps {
    dateString: string
}

function DateFormatter({ dateString }: DateFormatterProps) {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    return (
        <Text style={styles.dateText}>{formatDate(dateString)}</Text>
    )
}

const styles = StyleSheet.create({
    dateText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '600'
    },
})

export default DateFormatter