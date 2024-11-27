import { OrderDTO } from '@/dto/Order.dto';
import { Colors } from '@/Utility/Colors';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AddressComponent from '@/Componenets/AddressComponent';
import PhoneComponent from '@/Componenets/PhoneComponent';
import ActionsComponent from '@/Componenets/ActionsComponent';

function OrderDetails({ navigation, route }: { navigation: any; route: any }) {
    const { order }: { order: OrderDTO } = route.params;

    useEffect(() => {
        // Change Navigation Title based on client name
        navigation.setOptions({
            title: order.client.fullName
        })
    }, [])

    return (
        <ScrollView>

            <View style={styles.container}>

                <View style={styles.spacer} />

                <View style={styles.detailsHeader}>
                    <Text style={styles.headerText}>{order.client.fullName}</Text>
                    <Text style={[styles.headerText, { textAlign: 'right' }]}># {order.id}</Text>
                </View>

                <View style={[styles.detailsBody, { paddingBottom: 15 }]}>
                    <View style={styles.orangeBar} />

                    <View style={styles.valuesContainer}>

                        <AddressComponent order={order} />

                        <PhoneComponent order={order} />
                    </View>
                </View>

                <View style={[styles.detailsHeader, styles.itemsHeader]}>
                    <Text style={styles.subHeaderText}>Items:</Text>
                </View>

                <View style={[styles.detailsBody, styles.items]}>
                    {order.items.map((item, index) => (
                        <Text key={index} style={styles.itemText}>
                            {item.quantity} x {Array.isArray(item.item) ? item.item.join(", ") : item.item}
                        </Text>
                    ))}

                    <View style={styles.spacer} />

                    {order.notes && (
                        <>
                            {order.notes.instruction && (
                                <Text style={styles.noteText}>Instruction: {order.notes.instruction}</Text>
                            )}
                            {order.notes.amountTobePaid && (
                                <Text style={styles.noteText}>Amount to be paid: ${order.notes.amountTobePaid}</Text>
                            )}
                            {order.notes.deliveryCharge && (
                                <Text style={styles.noteText}>Delivery Charge: ${order.notes.deliveryCharge}</Text>
                            )}
                        </>
                    )}
                </View>

                <View style={styles.spacer} />

            </View>

            <ActionsComponent />


            {/* <Text style={styles.subTitle}>Status: {order.status}</Text>
            <Text style={styles.subTitle}>Delivery Date: {dayjs(order.date).format("MMM DD, YYYY hh:mm A")}</Text> */}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.lightGray,
    },
    spacer: {
        marginTop: 20
    },
    detailsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.powderBlue,
        borderTopEndRadius: 8,
        borderStartStartRadius: 8,
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 10
    },
    headerText: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        width: '50%'
    },
    detailsBody: {
        backgroundColor: Colors.white,
        padding: 10,
        height: 'auto',
        flexDirection: 'row',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        })
    },
    orangeBar: {
        width: 5,
        backgroundColor: Colors.darkOrange,
        marginRight: 10,
        borderRadius: 8
    },
    valuesContainer: {
        flex: 1,
        width: '90%'
    },
    itemsHeader: {
        backgroundColor: '#4682B4',
        marginTop: 20,
        width: '100%'
    },
    items: {
        flexDirection: 'column'
    },
    subHeaderText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'semibold',
    },
    itemText: {
        fontSize: 16,
        marginLeft: 16,
    },
    noteText: {
        fontSize: 16,
        fontStyle: "italic",
        marginBottom: 8,
        fontWeight: '600'
    },
})

export default OrderDetails