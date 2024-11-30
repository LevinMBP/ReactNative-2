import EventList from "@/components/Lists/EventList";
import { Colors } from "@/utility/Colors";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';


function EventScreen({ navigation }: { navigation: any }) {

    const handleButtonPress = () => {
        navigation.navigate("AddEvent");
    }

    return (
        <View style={styles.container}>
            <EventList navigation={navigation} />

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={handleButtonPress}
            >
                <FontAwesome6Icon
                    name="plus"
                    size={20}
                    color={Colors.white}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.lightGray
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
})

export default EventScreen