export interface EventType {
    id: string;
    eventDate: string;
    eventName: string;
    eventPlace: string;
    eventStartTime: string;
    eventEndTime: string;
    eventDetails: string;
    createdBy: string | null | undefined;
    favorites: [{ userId: string }]
}