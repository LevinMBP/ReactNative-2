import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { transactions } from '@/sampleData';


function Summary() {

    const totalExpenses = transactions.reduce((acc, transaction) => {
        const amount = parseFloat(transaction.amount.replace('$', ''));
        return acc + amount;
    }, 0)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Financial Summary</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Total Expenses:</Text>
                <Text style={styles.amount}>${totalExpenses.toFixed(2)}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Number of Transactions:</Text>
                <Text style={styles.value}>{transactions.length}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F1EBFD', // Your secondary color
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#521C98',
        marginBottom: 20,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    label: {
        fontSize: 16,
        color: 'black',
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF4500',
    },
    value: {
        fontSize: 16,
        color: 'black',
    }
})


export default Summary