import { View, StyleSheet, Image, TouchableOpacity, Text, Platform } from "react-native"
import { Colors } from "@/utility/Colors"
import { SafeAreaView } from "react-native-safe-area-context"

function WelcomeScreen({ navigation }: { navigation: any }) {
    return (
        <SafeAreaView style={styles.container}>

            {/* <View style={styles.container}> */}
            <View style={{ flex: 1 }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../assets/WelcomeImage.jpg')}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        Event Planning
                    </Text>
                    <Text style={styles.subtitle}>
                        Made Simple
                    </Text>
                    <View style={styles.subtextContainer}>
                        <Text style={styles.text}>
                            Organize, Manage, Your Events with Ease.
                        </Text>
                        <Text style={styles.text}>
                            Your Next Event Is Just a Tap Away!
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.replace("Signup")}
                    >
                        <Text style={styles.buttonText}>
                            Get Started
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.subButton}
                        onPress={() => navigation.replace("Login")}
                    >
                        <Text style={styles.subButtonText}>
                            Already have an account?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* </View> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    imageContainer: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 100 : 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: Platform.OS === 'ios' ? 500 : 550,
        alignSelf: 'center',
    },
    contentContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingBottom: 30,
        paddingTop: Platform.OS === 'ios' ? 50 : 0
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: Colors.primary
    },
    subtitle: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.primary
    },
    subtextContainer: {
        marginVertical: 10
    },
    text: {
        fontSize: 18,
        color: Colors.primary
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
    secondButton: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginTop: 10
    },
    buttonText: {
        fontSize: 18,
        color: Colors.white
    },
    secondButtonText: {
        fontSize: 18,
        color: Colors.primary
    },
    subButton: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'center'
    },
    subButtonText: {
        fontSize: 18,
        color: Colors.primary
    }
})

export default WelcomeScreen