import { Colors } from '@/Utility/Colors';
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'react-native-check-box';

import { useForm, Controller } from 'react-hook-form';
import { doc, getDoc, FIREBASE_AUTH, FIREBASE_DB, signInWithEmailAndPassword } from '@/Services/Firebase';

import { useUser } from '@/Context/UserContext';

interface FormData {
    email: string;
    password: string;
    userType: string;
}

function LoginScreen({ navigation, route }: { navigation: any, route: any }) {
    const { userType } = route.params;
    const { setUser } = useUser();

    console.log("Login UserType: ", userType);

    const [passwordShow, setPasswordShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            userType: userType
        }
    })

    const onSubmit = async (data: FormData) => {
        // console.log("Form Errors: ", errors);
        // console.log("Form Data: ", data);

        const PARTNER = "partners";
        const DRIVER = "drivers";

        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password);
            const user = userCredential.user;

            console.log(user.uid);

            // checks if the user id is in partners | drivers collection
            let userDocRef;
            if (data.userType === 'Partner') {
                userDocRef = doc(FIREBASE_DB, PARTNER, user.uid);
            }
            else {
                userDocRef = doc(FIREBASE_DB, DRIVER, user.uid);
            }

            // Gets Partner | driver in firestore
            try {
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    Alert.alert('Error', 'No account matched in our system');
                    return; // Stops here if there's no user found
                }

                Alert.alert('Login Success', `Welcome Back ${userDoc.data().firstName}!`);

                const userData = {
                    id: user.uid,
                    fullName: userDoc.data().fullName || "No Name",
                    email: userDoc.data().email,
                    userType: userType
                }

                // Set context user
                setUser(userData);

            }
            catch (error) {
                console.log("Error fetching account in Firestore", error);
                Alert.alert('Error', 'Error getting the account. Try again later.');
            }

        }
        catch (error: any) {
            console.log(error.code);
            console.log(error.message)
            if (error.code === 'auth/user-not-found' || 'auth/wrong-password') {
                Alert.alert('Error', 'Invalid credentials');
            }
            else {
                Alert.alert('Error', 'Something went wrong. Try again later.');
            }
        }
        finally {
            setIsLoading(false);
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
                        {userType === 'Partner' ? (
                            'Track Every Step of Your Delivery Journey'
                        ) : (
                            'Your Next Delivery Is Waiting'
                        )}
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

                <View style={styles.actionContainer}>

                    <Checkbox
                        style={styles.checkbox}
                        isChecked={isChecked}
                        onClick={() => setIsChecked(!isChecked)}
                    />
                    <Text style={styles.checkboxText}>
                        Remember Me
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? 'Logging in...' : 'Login'}
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
                        No account yet?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.replace('Signup', { userType: userType })}
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
        color: Colors.darkOrange,
        fontSize: 12,
        marginTop: 4
    }
})

export default LoginScreen;