import { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FIREBASE_DB, addDoc, collection, doc, updateDoc } from "@/services/Firebase";

import { Colors } from "@/utility/Colors";
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";
import { EventType } from "@/dto/Event.dto";
import { useUser } from "@/context/UserContext";


function EditEventScreen({ navigation, route }: { navigation: any; route: any }) {
    const { event }: { event: EventType } = route.params;
    const { user } = useUser();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<EventType>({
        defaultValues: {
            eventDate: event.eventDate || dayjs().format("MMMM DD,YYYY"),
            eventName: event.eventName || "",
            eventPlace: event.eventPlace || "",
            eventStartTime: event.eventStartTime || dayjs().format("HH:mm"),
            eventEndTime: event.eventEndTime || dayjs().format("HH:mm"),
            eventDetails: event.eventDetails || "",
            favorites: event.favorites || []
        }
    })

    const [showDate, setShowDate] = useState(false);
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: EventType) => {
        console.log("Event Data: ", data);
        console.log("USer ID: ", user?.id);

        setLoading(true);

        const eventDate = dayjs(data.eventDate).isValid()
            ? dayjs(data.eventDate).format("MMMM DD,YYYY")
            : data.eventDate;
        const eventStart = dayjs(data.eventStartTime).isValid()
            ? dayjs(data.eventStartTime).format("HH:mm")
            : data.eventStartTime;
        const eventEnd = dayjs(data.eventEndTime).isValid()
            ? dayjs(data.eventEndTime).format("HH:mm")
            : data.eventEndTime;

        const eventData: EventType = {
            id: event.id,
            eventName: data.eventName,
            eventPlace: data.eventPlace,
            eventDate: eventDate,
            eventStartTime: eventStart,
            eventEndTime: eventEnd,
            eventDetails: data.eventDetails,
            createdBy: user?.id,
            favorites: event.favorites
        }
        console.log("Form Data: ", data);
        console.log("Form Data Formated: ", eventData);

        try {
            const eventDoc = doc(FIREBASE_DB, 'events', event.id);
            await updateDoc(eventDoc, { ...eventData });

            Alert.alert("Event Updated", `Event Id:  ${eventDoc.id}`);
            reset();
            navigation.replace('BottomTabNavigator', { screen: 'Event' });
        }
        catch (error: any) {
            Alert.alert('Error adding Fleet', error);
            console.log("Adding Fleet Error: ", error);
        }
        finally {
            setLoading(false);
        }
    }


    const onDateChange = (event: any, selectedDate: any) => {
        setShowDate(false);
    }

    const onStartTime = (event: any, selectedTime: any) => {
        console.log("start time :", selectedTime)
        setShowStart(false);
    }

    const onEndTime = (event: any, selectedTime: any) => {
        console.log("End time :", selectedTime)
        setShowEnd(false);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>

                    <Text style={styles.inputLabel}>Event Name</Text>
                    <View style={styles.inputWrapper}>
                        <Controller
                            name="eventName"
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextInput
                                        placeholder='Enter your first name'
                                        placeholderTextColor={Colors.black}
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.textInput}
                                    />
                                )
                            }}
                            rules={{
                                required: 'Event name is required'
                            }}
                        />
                    </View>
                    {errors.eventName && <Text style={styles.errorText}>{errors.eventName.message}</Text>}

                    <Text style={styles.inputLabel}>Event Place</Text>
                    <View style={styles.inputWrapper}>
                        <Controller
                            name="eventPlace"
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextInput
                                        placeholder='Enter your event place'
                                        placeholderTextColor={Colors.black}
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.textInput}
                                    />
                                )
                            }}
                        />
                    </View>
                    {errors.eventPlace && <Text style={styles.errorText}>{errors.eventPlace.message}</Text>}


                    <Text style={styles.inputLabel}>Event Date</Text>
                    <Controller
                        control={control}
                        name="eventDate"
                        render={({ field: { onChange, value } }) => {
                            let dateVal = dayjs(value).isValid() ? dayjs(value).format("MMMM DD, YYYY") : dayjs().format("MMMM DD, YYYY");

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
                                            value={new Date()}
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
                        <Text style={styles.subHeaderText}>Event Time</Text>
                    </View>
                    <View style={styles.rowContainer}>

                        <View style={styles.timeWrapper}>
                            <Text style={styles.inputLabel}>Start Time</Text>
                            <Controller
                                control={control}
                                name="eventStartTime"
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

                        <View style={styles.timeWrapper}>
                            <Text style={styles.inputLabel}>End Time</Text>
                            <Controller
                                control={control}
                                name="eventEndTime"
                                render={({ field: { onChange, value } }) => {
                                    let timeVal = dayjs(value).isValid() ? dayjs(value).format("HH:mm") : dayjs().format("HH:mm");
                                    return (
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => setShowEnd(true)}
                                            >
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Start Time"
                                                    value={timeVal}
                                                    onChangeText={onChange}
                                                    editable={false}
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

                    <Text style={styles.inputLabel}>Event Description</Text>
                    <View style={styles.textAreaContainer}>
                        <Controller
                            name="eventDetails"
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextInput
                                        placeholder='Enter your event place'
                                        placeholderTextColor={Colors.black}
                                        value={value}
                                        multiline={true}
                                        numberOfLines={5}
                                        onChangeText={onChange}
                                        style={styles.textArea}
                                    />
                                )
                            }}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={styles.submitButton}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Updating Event...' : 'Update Event'}
                        </Text>
                    </TouchableOpacity>



                </View>
            </ScrollView>
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
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 4
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
        paddingLeft: 20
    },
    iconButton: {
        position: 'absolute',
        right: 10
    },
    textInput: {
        width: '100%',
        height: 48,
        paddingLeft: 5,
        fontSize: 16,
        textAlign: 'left',
        color: Colors.black
    },
    textAreaContainer: {
        flex: 1
    },
    textArea: {
        height: 150,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        paddingTop: 10,
        textAlignVertical: 'top',
        fontSize: 16,
        fontFamily: 'Poppins',
        marginBottom: 20,
    },
    inputWrapper: {
        width: '100%',
        height: 48,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        paddingLeft: 20,
        marginBottom: 10
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20
    },
    input: {
        height: 40,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingLeft: 8,
    },
    timeWrapper: {
        flex: 1
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
        width: '100%',
        marginBottom: 12
    },
    buttonText: {
        fontSize: 18,
        color: Colors.white
    },
    errorText: {
        color: Colors.darkOrange,
        fontSize: 12,
        marginTop: 4,
        marginBottom: 8
    }
})

export default EditEventScreen