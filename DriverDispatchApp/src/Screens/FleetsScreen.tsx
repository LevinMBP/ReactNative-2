import FleetList from "@/Componenets/Lists/FleetList";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "@/Utility/Colors";
import { populateClients } from "@/Resources/SampleClientData";
import { populateDriver } from "@/Resources/SampleDriverData";
import { populateOrders } from "@/Resources/SampleOrderData";
import { useUser } from "@/Context/UserContext";

function FleetsScreen({ navigation }: { navigation: any }) {
    const { user } = useUser();

    const handleButtonPress = () => {
        navigation.navigate("AddFleet");
    }
    console.log(user)
    return (
        <View style={styles.container}>
            {/* <Button
                onPress={populateOrders}
                title="Populate Database" /> */}
            <FleetList
                tabType="Fleet"
                navigation={navigation}
            />
            {user?.userType === 'Partner' && (
                <TouchableOpacity style={styles.floatingButton} onPress={handleButtonPress}>
                    <FontAwesome5Icon name="plus" size={20} color={Colors.white} />
                </TouchableOpacity>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF'
    },
    populateButton: {
        flex: 1
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
});

export default FleetsScreen