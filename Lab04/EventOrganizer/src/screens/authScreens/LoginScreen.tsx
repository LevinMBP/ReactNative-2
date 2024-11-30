import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/utility/Colors';

import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, signInWithEmailAndPassword } from '@/services/Firebase';
import { useUser } from '@/context/UserContext';

interface FormData {
    email: string;
    password: string;
}

function LoginScreen({ navigation }: { navigation: any }) {
    const { setUser } = useUser();
    const [passwordShow, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: FormData) => {
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password)
            const user = userCredential.user;

            const userData = {
                id: user.uid,
                email: user.email,
            }

            setUser(userData);

        }
        catch (error) {
            console.log("Error fetching account in Firestore", error);
            Alert.alert('Error', 'Error getting the account. Try again later.');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        Welcome Back!
                    </Text>
                    <Text style={styles.subTitle}>
                        Let's Manage your Events!
                    </Text>
                </View>

                {/* input fields */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.formLabel}>
                        Email Address
                    </Text>
                    <View style={styles.inputWrapper}>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    placeholder='Enter your email address'
                                    placeholderTextColor={Colors.black}
                                    keyboardType='email-address'
                                    value={value}
                                    onChangeText={onChange}
                                    style={styles.textInput}
                                />
                            )}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address'
                                }
                            }}
                        />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.formLabel}>
                        Password
                    </Text>
                    <View style={styles.inputWrapper}>

                        <Controller
                            name='password'
                            control={control}
                            render={({ field: { onChange, value } }) => (

                                <TextInput
                                    placeholder='Enter your password'
                                    placeholderTextColor={Colors.black}
                                    secureTextEntry={!passwordShow}
                                    style={styles.textInput}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            }}
                        />

                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setPasswordShow(!passwordShow)}
                        >
                            {passwordShow ? (

                                <Ionicons name='eye' size={24} color={Colors.black} />
                            ) : (

                                <Ionicons name='eye-off' size={24} color={Colors.black} />
                            )}
                        </TouchableOpacity>

                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Text>
                </TouchableOpacity>


                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                        No account yet?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.replace('Signup')}
                    >
                        <Text style={[styles.loginText, styles.loginButtonText]}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>

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
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
        color: Colors.black
    },
    subTitle: {
        fontSize: 18,
        color: Colors.black
    },
    fieldContainer: {
        marginBottom: 10
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8
    },
    inputWrapper: {
        width: '100%',
        height: 48,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        paddingLeft: 20
    },
    textInput: {
        width: '100%',
        height: 48,
        paddingLeft: 5,
        fontSize: 16,
        textAlign: 'left',
        color: Colors.black
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: 48,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    phoneInput: {
        width: '92%',
        height: 48,
        fontSize: 16,
        textAlign: 'left',
        color: Colors.black,
    },
    countryCode: {
        width: '8%',
        fontSize: 16,
        color: Colors.black,
        paddingLeft: 0,
        textAlign: 'left',
    },
    eyeButton: {
        position: 'absolute',
        right: 12
    },
    actionContainer: {
        flexDirection: 'row',
        marginVertical: 6
    },
    checkbox: {
        paddingTop: 10,
        marginRight: 8
    },
    checkboxText: {
        paddingTop: 12,
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
    ssoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30
    },
    viewBorder: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.gray,
        marginHorizontal: 10
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 22
    },
    loginText: {
        fontSize: 16,
        color: Colors.black
    },
    loginButtonText: {
        color: Colors.primary,
        fontWeight: 'bold',
        marginLeft: 5
    },
    errorText: {
        // color: Colors.darkOrange,
        fontSize: 12,
        marginTop: 4
    }
})

export default LoginScreen