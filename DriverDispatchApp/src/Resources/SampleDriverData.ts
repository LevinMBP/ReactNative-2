import { DriverDTO } from "@/dto/Driver.dto";
import { FIREBASE_DB } from "@/Services/Firebase";
import { writeBatch, doc } from 'firebase/firestore';

export const drivers: DriverDTO[] = [
    {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        documentExpiry: "2025-12-31",
        phone: "+1 123 456 7890",
        driverStatus: "Active",
        startedAt: "2020-03-15",
    },
    {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        fullName: "Jane Smith",
        documentExpiry: "2024-07-20",
        phone: "+1 234 567 8901",
        driverStatus: "Inactive",
        startedAt: "2019-06-10",
    },
    {
        id: "3",
        firstName: "Alex",
        lastName: "Brown",
        fullName: "Alex Brown",
        documentExpiry: "2026-05-12",
        phone: "+1 345 678 9012",
        driverStatus: "Active",
        startedAt: "2021-08-22",
    },
    {
        id: "4",
        firstName: "Emily",
        lastName: "Johnson",
        fullName: "Emily Johnson",
        documentExpiry: "2023-11-30",
        phone: "+1 456 789 0123",
        driverStatus: "Suspended",
        startedAt: "2018-02-17",
    },
    {
        id: "5",
        firstName: "Michael",
        lastName: "Lee",
        fullName: "Michael Lee",
        documentExpiry: "2024-09-10",
        phone: "+1 567 890 1234",
        driverStatus: "Active",
        startedAt: "2022-01-05",
    },
];

export const populateDriver = async () => {
    const batch = writeBatch(FIREBASE_DB);

    drivers.forEach((driver) => {
        const driverRef = doc(FIREBASE_DB, 'drivers', driver.id);

        const driverData = {
            ...driver
        }

        batch.set(driverRef, driverData);

    });

    console.log("Batch initiated");
    try {
        await batch.commit();
        console.log("Batch successful");
    } catch (err) {
        console.log("Batch Failed", err);
    }
}

export default drivers;