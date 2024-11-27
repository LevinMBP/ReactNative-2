import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

// Screens
import LoginScreen from "@/Screens/Auth/LoginScreen";
import SignupScreen from "@/Screens/Auth/SignupScreen";
import WelcomeScreen from "@/Screens/Auth/WelcomeScreen";
import ChoiceScreen from "@/Screens/Auth/ChoiceScreen";

import { Colors } from "@/Utility/Colors";


const Stack = createNativeStackNavigator();


function AuthNavigator() {
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
                    name="Choice"
                    component={ChoiceScreen}
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

export default AuthNavigator