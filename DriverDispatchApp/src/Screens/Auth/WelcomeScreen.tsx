import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/Utility/Colors';


function WelcomeScreen({ navigation }: { navigation: any }) {
    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={[Colors.primary, Colors.skyBlue]}
        >
            <View style={{ flex: 1 }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../../assets/images/Box2.jpg")}
                        style={styles.imageBox1}
                        resizeMode="contain"
                    />

                    <Image
                        source={require("../../../assets/images/Box1.jpg")}
                        style={styles.imageBox2}
                    />

                    <Image
                        source={require("../../../assets/images/Box4.jpg")}
                        style={styles.imageBox3}
                    />

                    <Image
                        source={require("../../../assets/images/Box3.jpg")}
                        style={styles.imageBox4}
                    />
                </View>

                <View style={styles.contentContainer}>

                    <Text style={styles.title}>
                        Delivery Fulfillment
                    </Text>
                    <Text style={styles.subtitle}>
                        Made Easy
                    </Text>
                    <View style={styles.subtextContainer}>
                        <Text style={styles.text}>
                            Track, Manage, and Deliver with Ease.
                        </Text>
                        <Text style={styles.text}>
                            Your Next Delivery Is Just a Tap Away!
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Choice", { actionType: 'Signup' })} // prevents user from going back here
                    >
                        <Text style={styles.buttonText}>
                            Get Started
                        </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={[styles.button, styles.secondButton]}
                        onPress={() => navigation.replace("SignupDriver")} // prevents user from going back here
                    >
                        <Text style={styles.secondButtonText}>
                            Get Started as Driver
                        </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.subButton}
                        onPress={() => navigation.navigate("Choice", { actionType: 'Login' })} // prevents user from going back here
                    >
                        <Text style={styles.subButtonText}>
                            Already have an account?
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    imageBox1: {
        height: 110,
        width: 110,
        borderRadius: 20,
        position: 'absolute',
        top: 40,
        left: 10,
        transform: [
            { translateX: 20 },
            { translateY: 50 },
            { rotate: "-20deg" }
        ]
    },
    imageBox2: {
        height: 110,
        width: 110,
        borderRadius: 20,
        position: 'absolute',
        top: 15,
        left: 110,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            { rotate: "-5deg" }
        ]
    },
    imageBox3: {
        height: 120,
        width: 120,
        borderRadius: 20,
        position: 'absolute',
        top: 180,
        left: -40,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            { rotate: "15deg" }
        ]
    },
    imageBox4: {
        height: 220,
        width: 220,
        borderRadius: 20,
        position: 'absolute',
        top: 140,
        left: 140,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            { rotate: "-15deg" }
        ]
    },
    contentContainer: {
        paddingHorizontal: 25,
        position: 'absolute',
        top: 500,
        width: '100%',
        zIndex: 2
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: Colors.white
    },
    subtitle: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.white
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