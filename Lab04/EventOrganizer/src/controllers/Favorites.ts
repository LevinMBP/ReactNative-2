import { FIREBASE_DB } from "@/services/Firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"


export const addUserToFavorites = async (eventId: string, userId: string | undefined | null) => {
    try {
        const eventRef = doc(FIREBASE_DB, 'events', eventId);
        await updateDoc(eventRef, {
            favorites: arrayUnion({ userId: userId })
        })
        console.log(`User ${userId} added to favorites for event ${eventId}`);
    }
    catch (error) {
        console.error('Error adding user to favorites:', error);
    }
}

export const removeUserToFavorites = async (eventId: string, userId: string | undefined | null) => {
    try {
        const eventRef = doc(FIREBASE_DB, 'events', eventId);
        await updateDoc(eventRef, {
            favorites: arrayRemove({ userId: userId })
        })
        console.log(`User ${userId} removed to favorites for event ${eventId}`);
    }
    catch (error) {
        console.error('Error adding user to favorites:', error);
    }
}