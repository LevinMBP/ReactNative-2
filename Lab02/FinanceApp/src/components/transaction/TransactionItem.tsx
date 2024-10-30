import { Transaction } from '@/sampleData';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import DateFormatter from '@/utils/DateFormatter';


const TransactionItem = ({ item, onPress }: { item: Transaction, onPress: () => void }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.itemContainer}>

            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemAmount}>{item.amount}</Text>
                <DateFormatter dateString={item.date} />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#F1EBFD',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderColor: '#521C98',
        borderWidth: 1
    },
    itemContent: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    itemTitle: {
        color: '#521C98',
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemAmount: {
        color: '#FF4500',
        fontSize: 16,
    }
})

export default TransactionItem