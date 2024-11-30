import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/utility/Colors';
import { EventType } from '@/dto/Event.dto';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '@/services/Firebase';


function AuthorActionsComponent({ navigation, item }: { navigation: any; item: EventType }) {

    const handleDeleteAction = () => {
        Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
            {
                text: "Cancel",
                style: 'cancel'
            },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        const eventDoc = doc(FIREBASE_DB, 'events', item.id);
                        await deleteDoc(eventDoc);
                        Alert.alert("Event Deleted", "The event has been deleted successfully.");
                    }
                    catch (error) {
                        console.log("Event Delete Error: ", error);
                        Alert.alert("Error", "There was an error deleting event.")
                    }
                }
            }
        ])
    }

    return (
        <View style={styles.container}>
            <View style={styles.actionContainer}>
                {/* Arrived || No Arrival */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditEvent', { event: item })}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleDeleteAction()}
                    style={[styles.button, styles.buttonRed]}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        height: 50,
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8
    },
    button: {
        width: '45%',
        backgroundColor: Colors.softPrimary,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        margin: 'auto',
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: Colors.white
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 500,
        textAlign: 'center'
    },
    buttonRed: {
        backgroundColor: Colors.darkOrange,
        borderColor: Colors.white
    },
})

export default AuthorActionsComponent