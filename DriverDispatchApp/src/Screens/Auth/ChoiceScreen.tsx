import { Colors } from '@/Utility/Colors';
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'react-native-check-box';

import { useForm, Controller } from 'react-hook-form';

function ChoiceScreen({ navigation, route }: { navigation: any; route: any }) {

    const { actionType } = route.params || 'Signup';

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        Welcome
                    </Text>
                    <Text style={styles.title}>
                        to Our
                    </Text>
                    <Text style={styles.title}>
                        Delivery Fullfilment
                    </Text>
                    <Text style={styles.subTitle}>
                        Please choose your role
                    </Text>
                </View>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        actionType === 'Signup'
                            ? navigation.navigate("Signup", { userType: 'Partner' })
                            : navigation.navigate("Login", { userType: 'Partner' })
                    }}
                >
                    <Text style={styles.buttonText}>
                        {actionType} as Partner
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button,]}
                    onPress={() => {
                        actionType === 'Signup'
                            ? navigation.navigate("Signup", { userType: 'Driver' })
                            : navigation.navigate("Login", { userType: 'Driver' })
                    }}
                >
                    <Text style={styles.buttonText}>
                        {actionType} as Driver
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    wrapper: {
        marginVertical: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.black
    },
    subTitle: {
        fontSize: 18,
        color: Colors.black,
        marginVertical: 10
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
        marginTop: 20,
        width: '100%'
    },
    buttonText: {
        fontSize: 18,
        color: Colors.white
    },
})

export default ChoiceScreen;