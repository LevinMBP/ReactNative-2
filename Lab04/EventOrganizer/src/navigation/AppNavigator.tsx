
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import EventScreen from "../screens/appScreens/EventScreen";
import FavoritesScreen from "../screens/appScreens/FavoritesScreen";
import { Platform, TouchableOpacity } from "react-native";

import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { Colors } from "@/utility/Colors";
import ProfileScreen from "@/screens/appScreens/ProfileScreen";
import AddEventScreen from "@/screens/appScreens/AddEventScreen";
import EditEventScreen from "@/screens/appScreens/EditEventScreen";



// Object for Stack Navigation
const Stack = createNativeStackNavigator();

// Object for Bottom Tab Navigation
const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>

            <StatusBar
                style="light"
                backgroundColor={Colors.primary}
            />

            <Stack.Navigator
                initialRouteName="BottomTabNavigator"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTintColor: Colors.softWhite
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
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerTitleAlign: 'center'
                    }}
                />

                <Stack.Screen
                    name="AddEvent"
                    component={AddEventScreen}
                    options={{
                        title: "New Event",
                        headerTitleAlign: 'center'
                    }}
                />

                <Stack.Screen
                    name="EditEvent"
                    component={EditEventScreen}
                    options={{
                        title: "Edit Event",
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
            initialRouteName="Event"
            screenOptions={({ route }) => ({
                title: "Events",
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.gray,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    height: Platform.OS === 'android' ? 80 : 90,
                    paddingTop: 10,
                    paddingBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: Colors.black,
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 2,
                    elevation: Platform.OS === 'android' ? 5 : 0
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginTop: Platform.OS === 'android' ? 5 : 0,
                    marginBottom: Platform.OS === 'android' ? 4 : 5,
                    fontFamily: 'Poppins'
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;
                    let defaultIcon = 'question-circle';
                    let defaultSize = 18;

                    if (route.name === 'Event') {
                        icon = 'calendar-days';
                    } else if (route.name === 'Favorite') {
                        icon = 'heart'
                    }
                    return (
                        <FontAwesome6Icon
                            name={icon || defaultIcon}
                            size={size || defaultSize}
                            color={focused ? Colors.primary : Colors.gray}
                        />
                    )
                },
            })}
        >
            <Tab.Screen
                name="Event"
                component={EventScreen}
                options={{ title: 'Events' }}
            />
            <Tab.Screen
                name="Favorite"
                component={FavoritesScreen}
                options={{ title: 'Favorites' }}
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

export default AppNavigator;