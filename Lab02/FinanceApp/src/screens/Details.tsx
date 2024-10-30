import DateFormatter from '@/utils/DateFormatter';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Details({ route }: { route: any }) {
    const { transaction } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction Details</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Transaction ID:</Text>
                <Text style={styles.value}>{transaction.id}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{transaction.name}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.itemAmount}>{transaction.amount}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Date:</Text>
                <DateFormatter dateString={transaction.date} />
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Details:</Text>
                <Text style={styles.value}>{transaction.details}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F1EBFD',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#521C98',
        textAlign: 'center',
        marginBottom: 20,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#521C98',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: 'black',
        flex: 1,
        textAlign: 'right',
    },
    itemAmount: {
        color: '#FF4500',
        fontSize: 16,
    }
})

export default Details