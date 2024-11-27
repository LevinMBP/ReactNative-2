import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

// Screens
import FleetsScreen from "@/Screens/FleetsScreen";
import FleetDetails from "@/Screens/FleetDetails";
import AddFleetScreen from "@/Screens/AddFleetScreen";
import Orders from "@/Screens/Orders";


// Utility
import { Colors } from "@/Utility/Colors";
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrderDetails from "@/Screens/OrderDetails";
import { Button, TouchableOpacity } from "react-native";
import ProfileScreen from "@/Screens/ProfileScreen";


// Object for Stack Navigation
const Stack = createNativeStackNavigator();

// Object for Bottom Tab Navigation
const Tab = createBottomTabNavigator();

// Object for Drawer Navigation
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>

            <StatusBar
                style="light"
                backgroundColor={Colors.primary}
            />

            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTintColor: Colors.white
                }}
            >

                <Stack.Screen
                    name="BottomTabNavigator"
                    component={BottomTabNavigator}
                    options={({ navigation }) => ({
                        title: '',
                        headerRight: () => <HeaderProfileButton navigation={navigation} />
                    })}
                />

                <Stack.Screen
                    name="FleetDetails"
                    component={FleetDetails}
                />

                <Stack.Screen
                    name="AddFleet"
                    component={AddFleetScreen}
                    options={{
                        title: "New Fleet",
                        headerTitleAlign: 'center'
                    }}
                />

                <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetails}
                    options={{
                        headerTitleAlign: 'center'
                    }}
                />

                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerTitleAlign: 'center'
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    )
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Fleets"
            screenOptions={({ route }) => ({
                title: "Fleets",
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.softWhite,
                    borderTopWidth: 2,
                    height: 80,
                    // paddingVertical is not working
                    paddingTop: 10,
                    paddingBottom: 10,
                    alignItems: 'center'
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginTop: 5,
                    color: Colors.primary
                    // fontWeight: 'bold'
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;
                    let defaultIcon = 'question-circle';
                    let defaultSize = 18;

                    if (route.name === 'Fleets') {
                        icon = 'inbox';
                    } else if (route.name === 'Dispatched') {
                        icon = 'receipt'
                    }
                    return <FontAwesome6Icon name={icon || defaultIcon} size={size || defaultSize} color={Colors.primary} />
                }
            })}
        >
            <Tab.Screen
                name="Fleets"
                component={FleetsScreen}
                options={{ title: "Fleets" }}
            />

            <Tab.Screen
                name="Dispatched"
                component={Orders}
                options={{ title: "Orders" }}
            />


        </Tab.Navigator>
    )
}

const HeaderProfileButton = ({ navigation }: any) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
    >
        <FontAwesome6Icon
            name="user-circle"
            size={24}
            color={Colors.white}
        />
    </TouchableOpacity>
)

export default AppNavigator