import { useUser } from "@/Context/UserContext";
import { listenToOrders } from "@/Controllers/OrderController";
import { OrderDTO } from "@/dto/Order.dto";
import { Colors } from "@/Utility/Colors";
import { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";


export default function OrderList({ navigation }: { navigation: any }) {
    const { user } = useUser();
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = listenToOrders((orderlist) => {
            setOrders(orderlist);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const renderItem = ({ item }: { item: OrderDTO }) => {
        return (
            <TouchableOpacity
                style={styles.orderItem}
                onPress={() => navigation.navigate('OrderDetails', {
                    order: {
                        ...item,
                        createdAt: item.createdAt.getDate(), // Getting warnings
                        date: item.date.getDate() // Getting warnings
                    }
                })}
            >
                <Text style={styles.orderText}>Order ID: {item.id}</Text>
                <Text style={styles.orderText}>Client: {item.client.fullName}</Text>

                <View style={styles.statusContainer}>
                    <Text style={styles.orderText}>Status: </Text>
                    <View style={[
                        styles.statusPill,
                        item.status === "Open" ? styles.open : styles.assigned
                    ]}>
                        <Text
                            style={
                                item.status === "Open" ? styles.statusText : styles.assignedText
                            }
                        > {item.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {user?.userType === 'Driver' ? (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500'
                    }}>We're currently working on this feature.</Text>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     padding: 16,
    //     backgroundColor: Colors.white,
    // },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // errorContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#f8d7da',
    //     padding: 20,
    // },
    orderItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.gray,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    orderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusPill: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    open: {
        backgroundColor: Colors.link
    },
    assigned: {
        backgroundColor: Colors.yellow
    },
    statusText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize'
    },
    assignedText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize'
    }
})
