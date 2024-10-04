import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import Home from './src/components/Home';
import Header from './src/components/Header';
import AddTodo from './src/components/Todos/AddTodo';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoProvider } from './src/Context/TodoContext';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <TodoProvider>
            <NavigationContainer>
                <StatusBar style='auto' />

                <Stack.Navigator
                    initialRouteName='Home'
                >
                    <Stack.Screen
                        name='Home'
                        component={Home}
                        options={{
                            headerTitle: () => <Header />
                        }}
                    />
                    <Stack.Screen
                        name='AddTodo'
                        component={AddTodo}
                        options={{
                            headerTitleAlign: 'center'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </TodoProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
