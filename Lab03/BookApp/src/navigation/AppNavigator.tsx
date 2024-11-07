import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import Books from '@/screens/Books';
import BookDetails from '@/screens/BookDetails';
import BorrowedBooks from '@/screens/BorrowedBooks';

// Utilities
import { Colors } from '@/utility/colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// Object for Stack Navigation
const Stack = createNativeStackNavigator();

// Object for Bottom Tab Navigation
const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name='BottomTabNavigator'
                    component={BottomTabNavigator}
                    options={{
                        title: '',
                        headerStyle: {
                            backgroundColor: Colors.white
                        }
                    }}
                />

                <Stack.Screen
                    name='BookDetails'
                    component={BookDetails}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Books'
            screenOptions={({ route }) => ({
                title: 'Books',
                headerShown: false,
                // tabBarActiveBackgroundColor: Colors.lightPrimary,
                tabBarActiveTintColor: Colors.darkPrimary,
                tabBarInactiveTintColor: Colors.gray,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Books') {
                        iconName = 'book';
                    }
                    else {
                        iconName = 'bookmark';
                    }
                    return <FontAwesome5Icon name={iconName} size={24} color={focused ? Colors.darkPrimary : Colors.gray} />
                }
            })}
        >
            <Tab.Screen
                name='Books'
                component={Books}
                options={{ title: 'Books' }}
            />
            <Tab.Screen
                name='BorrowedBooks'
                component={BorrowedBooks}
                options={{ title: 'Borrowed Books' }}
            />

        </Tab.Navigator>
    )
};

export default AppNavigator;