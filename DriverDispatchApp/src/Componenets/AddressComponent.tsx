import { OrderDTO } from '@/dto/Order.dto';
import { View, Text, Linking, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '@/Utility/Colors';

function AddressComponent({ order }: { order: OrderDTO }) {

    const openGoogleMaps = () => {
        // Get latitude and longitude from the address data (make sure they exist)
        const { lat, lng, streetName, streetNumber } = order.client.address;

        if (!lat || !lng) {
            console.error('Latitude or longitude is missing');
            return;
        }

        const scheme = Platform.select({
            ios: 'maps://0,0?q=',
            android: 'geo:0,0?q=',
        })

        const latLng = `${lat},${lng}`;
        const label = `${streetNumber} ${streetName}` || 'Custom Label';

        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        });

        Linking.openURL(url || "").catch((err) => console.error('An error occurred', err));
    }

    return (
        <View style={styles.addressContainer}>

            <View style={styles.addressItem}>
                <Text style={styles.bodyText}>
                    {order.client.address.unit} {order.client.address.streetNumber} {order.client.address.streetName}
                </Text>
                <Text style={styles.bodyText}>
                    {order.client.address.city}, {order.client.address.province} {order.client.address.postalCode}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.addressItem, styles.addressIcon]}
                onPress={openGoogleMaps}
            >
                <Entypo name='direction' size={24} color={Colors.green} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addressItem: {
        width: '50%'
    },
    addressIcon: {
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '400'
    },
})

export default AddressComponent