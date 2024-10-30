import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Transactions from '@/screens/Transactions';
import Summary from '@/screens/Summary';
import Details from '@/screens/Details';

// dependency for Navigation Container
// npm install @react-navigation/native

// dependency for Stack Navigator and Screen
// npm install @react-navigation/native-stack
// npm install react-native-screens react-native-safe-area-context

// dependency for bottom tabs
// npm install @react-navigation/bottom-tabs

// dependency for Drawer
// npm install @react-navigation/drawer
// npx expo install react-native-gesture-handler react-native-reanimated

// Vector icons
// npm install --save react-native-vector-icons

// Object for Stack Navigation
const Stack = createNativeStackNavigator();

// Object for Bottom Tab Navigation
const Tab = createBottomTabNavigator()


function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='BottomTab'
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Details'
                    component={Details}
                    options={{
                        title: 'Transactions',
                        headerBackVisible: true
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName='Transactions'
            screenOptions={({ route }) => ({
                headerBackgroundContainerStyle: {
                    backgroundColor: 'gray'
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 24,
                },
                headerTitleAlign: 'center',
                headerTintColor: '#521C98',
                tabBarActiveBackgroundColor: '#F1EBFD',
                tabBarActiveTintColor: '#521C98',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Transactions') {
                        iconName = 'money-check-alt'
                    }
                    else {
                        iconName = 'list-ol'
                    }
                    return <FontAwesome5Icon name={iconName} size={24} color={color} />
                }
            })}
        >

            <Tab.Screen
                name='Transactions'
                component={Transactions}
            />

            <Tab.Screen
                name='Summary'
                component={Summary}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator