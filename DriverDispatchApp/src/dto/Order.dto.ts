import { ClientDTO } from "./Client.dto";

type ItemType = 'Bag' | 'Box' | 'Pole' | 'TPN' | 'Meds' | 'Pickup';

interface OrderItem {
    item: ItemType | ItemType[];
    quantity: number;
}

interface OrderNotes {
    instruction?: string;
    deliveryCharge?: number;
    amountTobePaid?: number;
}

export interface OrderDTO {
    id: string;
    client: ClientDTO;
    items: OrderItem[];
    // Open if order has beed created but not assigned to a fleet
    // status will become Assigned if order has been added to a fleet
    // Arrived | No arrival && Completed | Not completed status will be prompted to the driver
    status: "Open" | "Assigned" | "Arrived" | "No Arrival" | "Completed" | "Not Completed";
    createdAt: Date;
    date: Date;
    fleetId?: string;
    notes?: OrderNotes;
}