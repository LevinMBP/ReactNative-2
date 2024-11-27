import { OrderDTO } from "@/dto/Order.dto";
import { FIREBASE_DB } from "@/Services/Firebase";
import { writeBatch, doc } from 'firebase/firestore';
import { generateFullName, generateFullAddress } from "@/dto/Client.dto";

import clients from "./SampleClientData";

export const Orders: OrderDTO[] = [
    {
        id: "order1",
        client: clients[0],
        items: [
            { item: "Bag", quantity: 3 },
            { item: "Box", quantity: 2 },
        ],
        status: "Open", // Order has been created but not yet assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Please deliver after 5 PM." },
    },
    {
        id: "order2",
        client: clients[1], // Jane Smith
        items: [{ item: "Pole", quantity: 3 }],
        status: "Open", // Order has been assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { amountTobePaid: 120 },
    },
    {
        id: "order3",
        client: clients[2], // Alice Johnson
        items: [
            { item: "Meds", quantity: 1 },
            { item: "Box", quantity: 5 },
        ],
        status: "Open", // Order has been created but not yet assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Handle with care" },
    },
    {
        id: "order4",
        client: clients[3], // Bob Brown
        items: [
            { item: "Box", quantity: 3 },
            { item: "TPN", quantity: 2 },
        ],
        status: "Open", // Order has been assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Deliver by noon" },
    },
    {
        id: "order5",
        client: clients[4], // Charlie Davis
        items: [
            { item: "Pickup", quantity: 1 },
        ],
        status: "Open", // Order has been assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { deliveryCharge: 15 },
    },
    {
        id: "order6",
        client: clients[0], // John Doe
        items: [
            { item: "Box", quantity: 2 },
            { item: "Bag", quantity: 5 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T08:30:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Fragile, handle with care." }
    },
    {
        id: "order7",
        client: clients[1], // Jane Smith
        items: [
            { item: "Box", quantity: 3 },
            { item: "Pole", quantity: 1 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T09:00:00.000Z"),
        date: new Date("2024-12-17T11:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Assemble upon delivery." }
    },
    {
        id: "order8",
        client: clients[2], // Alice Johnson
        items: [
            { item: "Meds", quantity: 1 },
            { item: "Box", quantity: 2 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T12:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Delivery before 3 PM." }
    },
    {
        id: "order9",
        client: clients[3], // Bob Brown
        items: [
            { item: "Box", quantity: 4 },
            { item: "TPN", quantity: 1 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T11:00:00.000Z"),
        date: new Date("2024-12-17T13:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Place on the second floor." }
    },
    {
        id: "order10",
        client: clients[4], // Charlie Davis
        items: [
            { item: "Pickup", quantity: 2 },
            { item: "Box", quantity: 1 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T12:00:00.000Z"),
        date: new Date("2024-12-17T14:00:00.000Z"),
        fleetId: "",
        notes: { deliveryCharge: 20, instruction: "Leave at the back door." }
    },
    {
        id: "order11",
        client: clients[0],
        items: [
            { item: "Bag", quantity: 3 },
            { item: "Box", quantity: 2 },
        ],
        status: "Open", // Order has been created but not yet assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Please deliver after 5 PM." },
    },
    {
        id: "order12",
        client: clients[1], // Jane Smith
        items: [{ item: "Pole", quantity: 3 }],
        status: "Open", // Order has been assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { amountTobePaid: 120 },
    },
    {
        id: "order13",
        client: clients[2], // Alice Johnson
        items: [
            { item: "Meds", quantity: 1 },
            { item: "Box", quantity: 5 },
        ],
        status: "Open", // Order has been created but not yet assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Handle with care" },
    },
    {
        id: "order14",
        client: clients[3], // Bob Brown
        items: [
            { item: "Box", quantity: 3 },
            { item: "TPN", quantity: 2 },
        ],
        status: "Open", // Order has been assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Deliver by noon" },
    },
    {
        id: "order15",
        client: clients[4], // Charlie Davis
        items: [
            { item: "Pickup", quantity: 1 },
        ],
        status: "Open", // Order has been assigned to a fleet
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { deliveryCharge: 15 },
    },
    {
        id: "order16",
        client: clients[0], // John Doe
        items: [
            { item: "Box", quantity: 2 },
            { item: "Bag", quantity: 5 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T08:30:00.000Z"),
        date: new Date("2024-12-17T10:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Fragile, handle with care." }
    },
    {
        id: "order17",
        client: clients[1], // Jane Smith
        items: [
            { item: "Box", quantity: 3 },
            { item: "Pole", quantity: 1 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T09:00:00.000Z"),
        date: new Date("2024-12-17T11:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Assemble upon delivery." }
    },
    {
        id: "order18",
        client: clients[2], // Alice Johnson
        items: [
            { item: "Meds", quantity: 1 },
            { item: "Box", quantity: 2 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T10:00:00.000Z"),
        date: new Date("2024-12-17T12:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Delivery before 3 PM." }
    },
    {
        id: "order19",
        client: clients[3], // Bob Brown
        items: [
            { item: "Box", quantity: 4 },
            { item: "TPN", quantity: 1 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T11:00:00.000Z"),
        date: new Date("2024-12-17T13:00:00.000Z"),
        fleetId: "",
        notes: { instruction: "Place on the second floor." }
    },
    {
        id: "order20",
        client: clients[4], // Charlie Davis
        items: [
            { item: "Pickup", quantity: 2 },
            { item: "Box", quantity: 1 }
        ],
        status: "Open",
        createdAt: new Date("2024-12-15T12:00:00.000Z"),
        date: new Date("2024-12-17T14:00:00.000Z"),
        fleetId: "",
        notes: { deliveryCharge: 20, instruction: "Leave at the back door." }
    }
];


export const populateOrders = async () => {
    try {
        const batch = writeBatch(FIREBASE_DB);

        Orders.forEach((order) => {
            const orderRef = doc(FIREBASE_DB, 'orders', order.id);
            const orderData = {
                ...order
            }

            batch.set(orderRef, orderData);

        });

        console.log("Batch initiated");
        await batch.commit();
        console.log("Batch successful");
    } catch (err) {
        console.log("Batch Failed", err);
    }
}