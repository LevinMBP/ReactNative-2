import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { transactions, Transaction } from '@/sampleData';
import TransactionList from '@/components/transaction/TransactionList';



const Transactions = ({ navigation }: { navigation: any }) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>(transactions)

    return (
        <View style={styles.container}>
            <TransactionList
                transactionList={transactionList}
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
        color: '#521C98',
    }
});

export default Transactions;