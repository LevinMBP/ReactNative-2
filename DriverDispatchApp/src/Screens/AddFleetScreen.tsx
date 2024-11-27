import { FleetDTO } from '@/dto/Fleet.dto';
import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { StyleSheet, Text, View, Button, TextInput, Platform, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import dayjs from 'dayjs';

// sampel data
import drivers from '@/Resources/SampleDriverData';
import { OrderDTO } from '@/dto/Order.dto';
import { listenToOrders } from '@/Controllers/OrderController';
import { Colors } from '@/Utility/Colors';

import { addDoc, collection, doc, FIREBASE_DB, getDoc, setDoc, updateDoc } from '@/Services/Firebase';


export default function AddFleetScreen() {

    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<FleetDTO>({
        defaultValues: {
            date: dayjs().toDate(),
            orders: [],
            isCompleted: false,
            isAvailable: 'Available',
            workingTime: {
                start: dayjs().format("HH:mm"),
                end: dayjs().format("HH:mm"),
                duration: 0
            }
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'orders',
    })

    const [orders, setOrders] = useState<any[]>([]);


    const [showDate, setShowDate] = useState(false);
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FleetDTO) => {
        // this should be done in onStartTime func or in onEndTime func
        let start: any = new Date(data.workingTime.start);
        let end: any = new Date(data.workingTime.end);
        let duration = ((end - start) / (1000 * 60 * 60)) | 0;
        data.workingTime.duration = duration;

        // console.log("Data: ", data)

        setIsLoading(true);

        const fleetData = {
            id: "",
            date: dayjs(data.date).format('MMMM DD, YYYY'),
            drivingDistance: 68,
            workingTime: {
                start: dayjs(data.workingTime.start).format("HH:mm"),
                end: dayjs(data.workingTime.end).format("HH:mm"),
                duration: duration
            },
            isAvailable: "Available",
            isCompleted: false,
            driver: data.driver?.id || "",
            orders: data.orders,
            createdAt: dayjs().format('MMMM, DD, YYYY')
        }


        try {
            // create fleet but I need to fill Fleet ID
            const fleetDoc = await addDoc(collection(FIREBASE_DB, 'fleets'), fleetData);

            {/* 
                setDoc vs updateDoc 
                setDoc replace the value
                updateDoc updates specific fields
            */}

            // Updates fleet id
            await setDoc(fleetDoc, {
                ...fleetData,
                id: fleetDoc.id
            });

            // Change order/s status
            for (const order of data.orders) {

                const orderRef = doc(FIREBASE_DB, 'orders', order.orderId); // orderId came from FORM data

                const orderSnap = await getDoc(orderRef);

                if (orderSnap.exists()) {
                    await updateDoc(orderRef, {
                        status: 'Assigned',
                        fleetId: fleetDoc.id
                    })
                    console.log(`Order ${orderRef.id} status updated to "Assigned"`);
                }
                else {
                    console.log(`Order ${orderRef.id} does not exist`);
                }
            }

            Alert.alert('Fleet Added Successfully', `Fleet #${fleetDoc.id}`);

            // Reset from
            reset();
        }
        catch (error: any) {
            Alert.alert('Error adding Fleet', error);
            console.log("Adding Fleet Error: ", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // populate orders
        const unsubscribe = listenToOrders((orders) => {
            setOrders(orders);
        })
        return () => {
            unsubscribe();
        };

    }, []);

    const onDateChange = (event: any, selectedDate: any) => {

        console.log(selectedDate)
        setShowDate(false);
    }

    const onStartTime = (event: any, selectedTime: any) => {

        console.log("start time :", selectedTime)
        setShowStart(false);
    }

    const onEndTime = (event: any, selectedDate: any) => {

        console.log(selectedDate)
        setShowEnd(false);
    }

    const handleAddOrder = (orderId: string) => {
        // console.log("line 61 ", orderId)
        append({ orderId: orderId }); // Add order to the list
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* <Text style={styles.header}>Add New Fleet</Text> */}
                <Text style={styles.inputLabel}>Driver</Text>

                <Controller
                    control={control}
                    name="driver.id"
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) => {
                                    onChange(itemValue);
                                }}
                                style={styles.picker}
                            >
                                {/* Option to leave empty */}
                                <Picker.Item label="Select Driver" value={null} />
                                {drivers.map((driver) => (
                                    <Picker.Item key={driver.id} label={driver.fullName} value={driver.id} />
                                ))}
                            </Picker>
                        </View>
                    )}
                />

                {/* Orders Picker - Multi-select with `useFieldArray` */}
                <Text style={styles.inputLabel}>Orders</Text>
                <View style={styles.orderList}>
                    {fields.map((item, index) => {
                        return (
                            <View key={item.id} style={styles.orderContainer}>
                                <Text style={styles.orderLabel}>Order: {item.orderId}</Text>
                                <Text>{orders.find(order => order.id === item.orderId)?.label}</Text>
                                <TouchableOpacity
                                    onPress={() => remove(index)}  // Remove the selected order
                                    style={styles.removeButton}
                                >
                                    <Text style={styles.removeButtonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    )}

                    {/* Available Orders Picker */}
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={undefined}
                            onValueChange={(itemValue) => {
                                console.log("line113 ", itemValue)
                                if (itemValue) {
                                    handleAddOrder(itemValue);
                                }
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select an Order" value={null} />

                            {/* Filter orders to only show those with status 'Open' and not already selected */}
                            {orders
                                .filter(order => order.status === 'Open' && !fields.some(field => field.orderId === order.id))
                                .map(order => (
                                    <Picker.Item key={order.id} label={`Order ${order.id}`} value={order.id} />
                                ))}

                        </Picker>
                    </View>
                    {errors.orders && <Text style={styles.errorText}>{errors.orders.message}</Text>}
                </View>


                <Text style={styles.inputLabel}>Fleet Date</Text>
                <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, value } }) => {
                        let dateVal = dayjs(value || dayjs()).format("MMM DD, YYYY");

                        return (
                            <View style={styles.dateContainer}>
                                <TouchableOpacity
                                    style={styles.dateWrapper}
                                    onPress={() => setShowDate(true)}
                                >
                                    <TextInput
                                        style={styles.dateInput}
                                        value={dateVal}
                                        placeholder="Select Date"
                                        editable={false} // Prevent manual edit
                                    />
                                    <FontAwesome6Icon
                                        name="calendar-days"
                                        size={24}
                                        color="black"
                                        style={styles.iconButton}
                                    />
                                </TouchableOpacity>

                                {showDate && (
                                    <DateTimePicker
                                        value={value || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            onChange(selectedDate || value);
                                            onDateChange(event, selectedDate);
                                        }}
                                    />
                                )}
                            </View>
                        )
                    }}
                />


                <View style={styles.subHeader}>
                    <Text style={styles.subHeaderText}>Working Time</Text>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Start Time</Text>
                        <Controller
                            control={control}
                            name="workingTime.start"
                            render={({ field: { onChange, value } }) => {
                                let timeVal = dayjs(value).isValid() ? dayjs(value).format("HH:mm") : dayjs().format("HH:mm");
                                return (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => setShowStart(true)}
                                        >
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Start Time"
                                                value={timeVal}
                                                onChangeText={onChange}
                                                editable={false}
                                            />
                                        </TouchableOpacity>

                                        {showStart && (
                                            <DateTimePicker
                                                value={new Date()}
                                                mode="time"
                                                display="default"
                                                is24Hour={true}
                                                onChange={(event, selectedTime) => {
                                                    onChange(selectedTime || value);
                                                    onStartTime(event, selectedTime);
                                                }}
                                            />
                                        )}
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>End Time</Text>
                        <Controller
                            control={control}
                            name="workingTime.end"
                            render={({ field: { onChange, value } }) => {
                                let timeVal = dayjs(value).isValid() ? dayjs(value).format("HH:mm") : dayjs().format("HH:mm");
                                return (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => setShowEnd(true)}
                                        >
                                            <TextInput
                                                style={styles.input}
                                                placeholder="End Time"
                                                value={timeVal}
                                                editable={false}
                                                onChangeText={onChange}
                                            />
                                        </TouchableOpacity>

                                        {showEnd && (
                                            <DateTimePicker
                                                value={new Date()}
                                                mode="time"
                                                display="default"
                                                is24Hour={true}
                                                onChange={(event, selectedTime) => {
                                                    onChange(selectedTime || value);
                                                    onEndTime(event, selectedTime);
                                                }}
                                            />
                                        )}
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={styles.submitButton}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? 'Adding Fleet...' : 'Add Fleet'}
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        marginHorizontal: 12,
        marginTop: 15
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    dateContainer: {
        marginBottom: 15,
    },
    dateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        borderColor: Colors.black,
        borderRadius: 8,
        borderWidth: 1,
        height: 50
    },
    dateInput: {
        flex: 1,
        fontSize: 16,
        paddingRight: 40,
        height: '100%',
        paddingLeft: 8
    },
    iconButton: {
        position: 'absolute',
        right: 10
    },
    subHeader: {
        marginVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black
    },
    subHeaderText: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,

    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 4
    },
    input: {
        height: 40,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingLeft: 8,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 8,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        borderColor: Colors.black,
    },
    orderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        marginBottom: 8
    },
    orderList: {
        marginHorizontal: 3
    },
    orderLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: 'white',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20
    },
    inputWrapper: {
        flex: 1,
    },
    submitButton: {
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
    errorText: {
        color: Colors.darkOrange,
        fontSize: 12,
        marginTop: 4
    }
})