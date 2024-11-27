import { useUser } from "@/Context/UserContext";
import { Colors } from "@/Utility/Colors";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function ProfileScreen({ navigation }: any) {
    const { logout } = useUser();

    const handleSignOut = () => {
        logout();

        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }], // You can replace 'BottomTabNavigator' with the name of your login or home screen
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={logout}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'flex-end'
    },
    button: {
        paddingBottom: 16,
        paddingVertical: 12,
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        marginTop: 40,
        width: '100%'
    },
    buttonText: {
        fontSize: 18,
        color: Colors.white
    },
})

export default ProfileScreen