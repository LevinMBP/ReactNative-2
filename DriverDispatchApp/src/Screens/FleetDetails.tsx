import { OrderDTO } from "@/dto/Order.dto";
import { Colors } from "@/Utility/Colors";
import dayjs from "dayjs";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

function FleetDetails({ route, navigation }: { route: any, navigation: any }) {

    const { fleet } = route.params || {};

    // Function to render each order item
    const renderOrderItem = ({ item }: { item: OrderDTO }) => {

        return (
            <TouchableOpacity
                style={styles.orderItem}
                onPress={() => navigation.navigate('OrderDetails', { order: item })}
            >
                <View style={styles.orderHeader}>

                    <View style={styles.orderDetails}>
                        <View style={styles.orderDetailsContainer}>
                            <Text style={styles.orderText}>Client:</Text>
                            <Text style={styles.orderItemText}>
                                {item.client.firstName} {item.client.lastName}
                            </Text>
                        </View>

                        <View style={styles.orderDetailsContainer}>
                            <Text style={styles.orderText}>Address:</Text>
                            <Text style={styles.orderItemText}>
                                {item.client.address.unit} {item.client.address.streetNumber} {item.client.address.streetName},
                                {item.client.address.city}, {item.client.address.province}, {item.client.address.postalCode}
                            </Text>
                        </View>

                        <View style={styles.orderDetailsContainer}>
                            <Text style={styles.orderText}>Order ID:</Text>
                            <Text style={styles.orderItemText}>{item.id}</Text>
                        </View>

                        <View style={styles.orderBorder}></View>

                        <View style={styles.itemsContainer}>
                            <Text style={styles.itemsText}>Items to be Delivered:</Text>
                            {/* Build the items text */}
                            <Text style={styles.itemsValue}>
                                [
                                {
                                    item.items.map((orderItem, index) => {
                                        // Build the array with item quantity and name
                                        return `${orderItem.quantity}x ${orderItem.item}`;
                                    }).join(', ') // Join the array elements with a comma and space
                                }
                                ]
                            </Text>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>{fleet.id}</Text> */}
            <Text style={styles.title}> [ {fleet.date} ]</Text>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Fleet:</Text>
                <Text style={styles.valueText}>
                    {fleet.id}
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Distance:</Text>
                <Text style={styles.valueText}>
                    {fleet.drivingDistance} km
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Duration:</Text>
                <Text style={styles.valueText}>
                    {fleet.workingTime.duration}
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Driver:</Text>
                <Text style={styles.valueText}>
                    [ {fleet?.driver?.fullName || "No Driver"} ]
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Orders:</Text>
                <Text style={styles.valueText}>
                    {fleet.orders.length}
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.subTitle}>Orders:</Text>
            </View>

            <FlatList
                data={fleet.orders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },


    // Details style
    detailsContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    detailText: {
        fontSize: 16,

        marginBottom: 0,
        marginRight: 5,
        flex: 0.2,
    },
    valueText: {
        fontWeight: "600",
        fontSize: 16,
        flex: 0.8,
        marginBottom: 0,
    },

    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },

    // The orderItem for the list of orders
    orderItem: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },

    orderHeader: {
        flexDirection: "row",
        marginBottom: 10,
    },
    orderDetails: {
        flex: 1
    },
    orderDetailsContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    orderText: {
        fontSize: 16,
        marginBottom: 5,
        width: '20%'
    },
    itemsContainer: {
        marginTop: 10,
    },
    orderItemText: {
        flex: 1,
        flexWrap: 'wrap',
        width: '80%',
        marginStart: 5,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    orderBorder: {
        borderWidth: 0.5,
        borderColor: Colors.gray
    },

    itemsText: {
        fontSize: 16,
        marginBottom: 5
    },
    itemsValue: {
        flex: 1,
        flexWrap: 'wrap',
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default FleetDetails;
