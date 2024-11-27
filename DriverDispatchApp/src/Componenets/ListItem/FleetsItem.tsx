import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { FleetDTO } from '@/dto/Fleet.dto';
import { Colors } from '@/Utility/Colors';

function FleetsItem({ item, onPress, navigation }: { item: FleetDTO; onPress: (fleet: FleetDTO) => void; navigation: any }) {

    // console.log("Fleet Item: ", item)
    // console.log("Fleet Item Orders: ", item.orders)

    // Handle pres should be here

    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            style={[
                styles.fleetItem,
                item.isAvailable === 'Available'
                    ? { borderColor: Colors.greenSecondary }
                    : { borderColor: Colors.gray }
            ]}
        >
            <Text style={styles.fleetText}>Fleet#: <Text style={styles.valueText}>{item.id.toUpperCase()}</Text></Text>
            <Text style={styles.fleetText}>Date: <Text style={styles.valueText}>{`[ ${item.date} ]`}</Text></Text>
            <Text style={styles.fleetText}>Driving Distance: <Text style={styles.valueText}>{item.drivingDistance} km</Text></Text>
            <Text style={styles.fleetText}>Working Time: <Text style={styles.valueText}>{item.workingTime.start} - {item.workingTime.end}</Text></Text>
            <Text style={styles.fleetText}>Duration: <Text style={styles.valueText}>{item.workingTime.duration}</Text></Text>
            <Text style={styles.fleetText}>Orders: <Text style={styles.valueText}>{item.orders.length}</Text></Text>
            {/* <Text style={styles.fleetText}>Visited Orders: <Text style={styles.valueText}>{item.orders.length}</Text></Text> */}
            {/* <Text
                style={[
                    styles.statusText,
                    item.isAvailable === 'Available' ? styles.available : styles.accepted,
                ]}
            >
                {item.isAvailable}
            </Text> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fleetItem: {
        backgroundColor: "#fff",
        marginBottom: 10,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#ddd",
    },
    fleetText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "normal", // Default text for labels (normal weight)
    },
    valueText: {
        fontWeight: "600", // Semi-bold text for the values
    },
    statusText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    available: {
        color: "green", // Available status color
    },
    accepted: {
        color: "red", // Accepted status color
    },
})

export default FleetsItem