import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/utility/Colors';
import { FIREBASE_AUTH, createUserWithEmailAndPassword } from '@/services/Firebase';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function SignupScreen({ navigation }: { navigation: any }) {

    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: FormData) => {

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password);
            const user = userCredential.user;
            Alert.alert('Account Created!', 'You can now login');
            navigation.replace('Login');

        }
        catch (error: any) {
            Alert.alert('Error', error.message);
            console.log("Signup Error: ", error.code);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollViewContainer}
                    keyboardShouldPersistTaps="handled"
                >


                    <View style={styles.wrapper}>
                        <Text style={styles.title}>
                            Get Started
                        </Text>
                        <Text style={styles.subTitle}>
                            Let's plan your next big event.
                        </Text>
                    </View>

                    {/* input fields */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.formLabel}>
                            First Name
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Controller
                                name='firstName'
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder='Enter your first name'
                                        placeholderTextColor={Colors.black}
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.textInput}
                                    />
                                )}
                                rules={{
                                    required: 'First name is required',
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,  // Allows letters and spaces
                                        message: 'First name can only contain letters and spaces',
                                    },
                                }}
                            />
                        </View>
                        {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.formLabel}>
                            Last Name
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Controller
                                name='lastName'
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder='Enter your last name'
                                        placeholderTextColor={Colors.black}
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.textInput}
                                    />
                                )}
                                rules={{
                                    required: 'Last name is required',
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,  // Allows letters and spaces
                                        message: 'Last name can only contain letters and spaces',
                                    },
                                }}
                            />
                        </View>
                        {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
                    </View>

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

                    <View style={styles.fieldContainer}>
                        <Text style={styles.formLabel}>
                            Confirm Password
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder='Confirm your password'
                                        placeholderTextColor={Colors.black}
                                        secureTextEntry={!confirmPasswordShow}
                                        style={styles.textInput}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                rules={{
                                    required: 'Confirm password is required',
                                    validate: (value, formValues) => value === formValues.password || 'Passwords do not match'
                                }}
                            />

                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
                            >
                                {confirmPasswordShow ? (

                                    <Ionicons name='eye' size={24} color={Colors.black} />
                                ) : (

                                    <Ionicons name='eye-off' size={24} color={Colors.black} />
                                )}
                            </TouchableOpacity>

                        </View>
                        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                    </View>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Text>
                    </TouchableOpacity>

                    {/* <View style={styles.ssoContainer}>
                    <View style={styles.viewBorder} />
                    <Text>
                        or Sign up with
                    </Text>
                    <View style={styles.viewBorder} />
                </View> */}

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.replace('Login')}
                        >
                            <Text style={[styles.loginText, styles.loginButtonText]}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        padding: 12
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
        color: Colors.darkOrange,
        fontSize: 12,
        marginTop: 4
    }
})

export default SignupScreen