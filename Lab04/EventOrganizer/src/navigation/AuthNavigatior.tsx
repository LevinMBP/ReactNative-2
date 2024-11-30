
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"

import { Colors } from "@/utility/Colors";
import WelcomeScreen from "@/screens/authScreens/WelcomeScreen";
import LoginScreen from "@/screens/authScreens/LoginScreen";
import SignupScreen from "@/screens/authScreens/SignupScreen";



// Object for Stack Navigation
const Stack = createNativeStackNavigator();

// Object for Bottom Tab Navigation
const Tab = createBottomTabNavigator();


const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar
                style="light"
                backgroundColor={Colors.primary}
            />

            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTintColor: Colors.white,
                    headerTitleAlign: 'center'
                }}
            >

                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{
                        headerShown: false
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthNavigator;