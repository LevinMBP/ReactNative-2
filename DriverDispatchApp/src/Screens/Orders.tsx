import FleetList from '@/Componenets/Lists/FleetList';
import OrderList from '@/Componenets/Lists/OrderList';
import React from 'react'
import { View, StyleSheet } from 'react-native'

function Orders({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <OrderList navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF'
    }
});

export default Orders