import { EventType } from "@/dto/Event.dto";
import { FIREBASE_DB, collection } from "@/services/Firebase";
import { onSnapshot } from "firebase/firestore";

export const listenToEvents = (callback: (events: EventType[]) => void) => {
    try {
        const eventCollection = collection(FIREBASE_DB, 'events');

        const unsubscribe = onSnapshot(eventCollection, (snapshot) => {
            const eventList: EventType[] = [];

            snapshot.forEach((event) => {
                const data = event.data();

                eventList.push({
                    id: data.id,
                    createdBy: data.createdBy,
                    eventDate: data.eventDate,
                    eventName: data.eventName,
                    eventPlace: data.eventPlace,
                    eventStartTime: data.eventStartTime,
                    eventEndTime: data.eventEndTime,
                    eventDetails: data.eventDetails,
                    favorites: data.favorites
                })
            })

            return callback(eventList);

        })
        return unsubscribe;
    } catch (error) {
        console.log('Error fetching events: ', error);
        throw new Error('Failed to load orders');
    }

}