import { FleetDTO } from "@/dto/Fleet.dto";
import { OrderDTO } from "@/dto/Order.dto";
import { FIREBASE_DB } from "@/Services/Firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";






export const listenToFleets = (callback: (fleets: FleetDTO[]) => void) => {
    try {
        const fleetCollection = collection(FIREBASE_DB, 'fleets');

        const unsubscribe = onSnapshot(fleetCollection, async (snapshot) => {
            const fleetList: FleetDTO[] = [];

            // console.log("SNapshot docs: ", snapshot.docs);

            for (const fleet of snapshot.docs) {
                const data = fleet.data();

                const fleetData: FleetDTO = {
                    id: fleet.id,
                    date: data.date,
                    drivingDistance: data.drivingDistance,
                    workingTime: data.workingTime,
                    isAvailable: data.isAvailable,
                    isCompleted: data.isCompleted,
                    driver: data.driver ? data.driver : undefined,
                    orders: [],
                    createdAt: data.createdAt
                }

                // fetch order by id
                const fetchOrders = data.orders.map(async (order: any) => { // so it wont get redlines
                    const orderRef = doc(FIREBASE_DB, 'orders', order.orderId);
                    const orderSnap = await getDoc(orderRef);

                    const orderData = orderSnap.data();

                    const orderItem: any = { // so it wont get redlines
                        ...orderData
                    }

                    if (orderSnap.exists()) {
                        return orderItem;
                    }
                    else {
                        console.log(`Order with ID ${order.orderId} does not exist`);
                        return { ...order, status: "Not Found" }; // Optional fallback if order does not exist
                    }
                })

                const orders = await Promise.all(fetchOrders);

                fleetData.orders = orders;
                fleetList.push(fleetData);
                // console.log("Fleet Data: ", fleetData);
            }

            return callback(fleetList);
        })

        return unsubscribe;
    }
    catch (error) {
        console.error('Error fetching Fleets: ', error);
        throw new Error('Failed to load Fleets');
    }
}