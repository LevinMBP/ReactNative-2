import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/Utility/Colors';


function OrderActionsComponent() {
    const [arrivedStatus, setArrivedStatus] = useState<null | string>(null);
    const [completionStatus, setCompletionStatus] = useState<null | string>(null);
    const [departureStatus, setDepartureStatus] = useState(false);


    return (
        <View style={styles.container}>

            {!arrivedStatus && (

                <View style={styles.actionContainer}>
                    {/* Arrived || No Arrival */}
                    <TouchableOpacity
                        onPress={() => setArrivedStatus('Arrived')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Arrived</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setArrivedStatus('No Arrival')}
                        style={[styles.button, styles.buttonRed]}
                    >
                        <Text style={styles.buttonText}>No Arrival</Text>
                    </TouchableOpacity>
                </View>
            )}
            {arrivedStatus && (
                <View style={styles.statusContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.statusText}>{arrivedStatus}</Text>
                    <View style={styles.divider} />
                </View>
            )}


            {/* Completed || Not Complete */}
            {!completionStatus && arrivedStatus && (

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        onPress={() => setCompletionStatus('Completed')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setCompletionStatus('Not Complete')}
                        style={[styles.button, styles.buttonRed]}
                    >
                        <Text style={styles.buttonText}>Not Complete</Text>
                    </TouchableOpacity>
                </View>
            )}
            {completionStatus && (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>{completionStatus}</Text>
                    <View style={styles.divider} />
                </View>
            )}

            {/* Departure */}
            {!departureStatus && completionStatus && (

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        onPress={() => setDepartureStatus(true)}
                        style={[styles.button, styles.buttonDefault]}
                    >
                        <Text style={styles.buttonText}>Departure</Text>
                    </TouchableOpacity>
                </View>
            )}
            {departureStatus && (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Departed</Text>
                    <View style={styles.divider} />
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        height: 50
    },
    button: {
        width: '45%',
        backgroundColor: Colors.greenSecondary,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        margin: 'auto',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: Colors.greenSecondary
    },
    buttonRed: {
        backgroundColor: Colors.darkOrange,
        borderColor: Colors.darkOrange
    },
    buttonDefault: {
        backgroundColor: Colors.lightBlue,
        borderColor: Colors.lightBlue
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 500,
        textAlign: 'center'
    },
    buttonTextRed: {
        color: Colors.darkOrange
    },
    statusContainer: {
        backgroundColor: Colors.primary,
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    statusText: {
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'left',
        color: Colors.softWhite,
        marginLeft: 5,
        marginVertical: 5
    },
    divider: {
        borderWidth: 0.5,
        borderColor: Colors.gray,
    }
})


export default OrderActionsComponent