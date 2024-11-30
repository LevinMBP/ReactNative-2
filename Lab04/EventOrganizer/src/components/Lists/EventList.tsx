import { listenToEvents } from '@/controllers/EventController';
import { EventType } from '@/dto/Event.dto';
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator, Text, Platform } from 'react-native'
import { Colors } from '@/utility/Colors';
import FavoriteButton from '../Action/Favorite';
import AuthorActionsComponent from '../Action/AuthorActionsComponent';
import { useUser } from '@/context/UserContext';

function EventList({ navigation }: { navigation: any }) {

    const { user } = useUser();
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = listenToEvents((eventlist) => {
            setEvents(eventlist);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    const renderItem = ({ item }: { item: EventType }) => {

        return (
            <View style={styles.itemContainer}>
                <View style={styles.eventHeader}>
                    <Text style={styles.headerText}>Event: {item.eventName}</Text>
                    <Text style={styles.eventText}>{item.eventDate}</Text>
                </View>


                <View style={[styles.detailsBody, { paddingBottom: 15 }]}>
                    <View style={styles.orangeBar} />

                    <View style={styles.valuesContainer}>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <View style={{ width: '30%' }}>
                                <Text style={[styles.eventText, { fontWeight: '500' }]}>
                                    Event Duration:
                                </Text>
                            </View>
                            <View style={{ width: 'auto' }}>
                                <Text style={[styles.eventText, { paddingLeft: 10 }]}>[{item.eventStartTime} - {item.eventEndTime}]</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <View style={{ width: '30%' }}>
                                <Text style={[styles.eventText, { fontWeight: '500' }]}>Event Location:</Text>
                            </View>
                            <View style={{ width: 'auto' }}>
                                <Text style={[styles.eventText, { paddingLeft: 10 }]}>
                                    {item.eventPlace}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <View style={{ width: '30%' }}>
                                <Text style={[styles.eventText, { fontWeight: '500' }]}>
                                    Event Details:
                                </Text>
                            </View>
                            <Text style={[styles.eventText, { paddingLeft: 10 }]}>{item.eventDetails}</Text>
                        </View>
                    </View>

                    <FavoriteButton event={item} />
                </View>

                {item.createdBy === user?.id && (
                    <AuthorActionsComponent navigation={navigation} item={item} />
                )}

            </View>

        )
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.spacer} />
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.black }}>No Posted Events Yet.</Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spacer: {
        marginTop: 15
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        backgroundColor: Colors.white,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        marginVertical: 10
    },
    eventHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.lightPrimary,
        borderTopEndRadius: 8,
        borderStartStartRadius: 8,
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 10
    },
    headerText: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        width: '50%'
    },
    detailsBody: {
        backgroundColor: Colors.white,
        padding: 10,
        height: 'auto',
        flexDirection: 'row',
    },
    orangeBar: {
        width: 5,
        backgroundColor: Colors.darkOrange,
        marginRight: 10,
        borderRadius: 8
    },
    favoriteBar: {

    },
    valuesContainer: {
        flex: 1,
        width: 'auto'
    },
    eventText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    heartContainer: {
        alignItems: 'center',
        marginTop: 10,
        width: 30,
    },
})

export default EventList