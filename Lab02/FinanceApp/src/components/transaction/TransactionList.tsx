import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';
import { Transaction } from '@/sampleData';


const TransactionList = ({ transactionList, navigation }: { transactionList: Transaction[], navigation: any }) => {

    const renderItem = ({ item }: { item: Transaction }) => {
        return (
            <TransactionItem
                item={item}
                onPress={() => navigation.navigate('Details', { transaction: item })}
            />
        )
    }

    return (
        <FlatList
            data={transactionList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    )
}

export default TransactionList