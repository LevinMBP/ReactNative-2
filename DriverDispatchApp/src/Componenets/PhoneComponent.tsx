import { OrderDTO } from '@/dto/Order.dto'
import { Colors } from '@/Utility/Colors';
import React from 'react'
import { TouchableOpacity, StyleSheet, Linking, Text } from 'react-native'

function PhoneComponent({ order }: { order: OrderDTO }) {

    const handleCall = () => {
        const phoneNumber = order.client.phone;
        const phoneUrl = `tel:${phoneNumber}`;

        // Open the dialer with the phone number
        Linking.openURL(phoneUrl)
            .catch((err) => console.error('An error occurred', err));
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleCall}
        >
            <Text style={styles.bodyText}>
                {order.client.phone}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.link
    },
})

export default PhoneComponent