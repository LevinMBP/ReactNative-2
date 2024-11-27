import { OrderDTO } from '@/dto/Order.dto';
import { collection, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '@/Services/Firebase';





// Function to fetch orders from Firestore
export const listenToOrders = (callback: (orders: OrderDTO[]) => void) => {
    try {

        const ordersCollection = collection(FIREBASE_DB, 'orders');

        const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
            const orderList: OrderDTO[] = [];

            snapshot.forEach((order) => {
                const data = order.data();

                orderList.push({
                    id: order.id,
                    client: data.client,
                    items: data.items,
                    status: data.status,
                    createdAt: data.createdAt.toDate(),
                    date: data.date.toDate(),
                    fleetId: data.fleetId,
                    notes: data.notes ? data.notes : undefined,
                })
            })

            return callback(orderList);
        })

        return unsubscribe;


    } catch (error) {
        console.error('Error fetching orders: ', error);
        throw new Error('Failed to load orders');
    }
}