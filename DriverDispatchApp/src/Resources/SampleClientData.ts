import { ClientDTO, generateFullAddress, generateFullName } from "@/dto/Client.dto";
import { FIREBASE_DB } from "@/Services/Firebase";
import { writeBatch, doc } from 'firebase/firestore';

const clients: ClientDTO[] = [
    {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        address: {
            unit: "Apt 101",
            streetNumber: "123",
            streetName: "Oxford St W",
            city: "London",
            province: "ON",
            postalCode: "N6H 1W5",
            lat: "42.9737",
            lng: "-81.2649"
        },
        fullName: generateFullName("John", "Doe"),
        fullAddress: generateFullAddress({
            unit: "Apt 101",
            streetNumber: "123",
            streetName: "Oxford St W",
            city: "London",
            province: "ON",
            postalCode: "N6H 1W5",
            lat: "42.9737",
            lng: "-81.2649"
        }),
        phone: "+1 555 123 4567"
    },
    {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        address: {
            unit: "Unit 5B",
            streetNumber: "456",
            streetName: "Richmond St",
            city: "London",
            province: "ON",
            postalCode: "N6A 3C7",
            lat: "42.9860",
            lng: "-81.2430"
        },
        fullName: generateFullName("Jane", "Smith"),
        fullAddress: generateFullAddress({
            unit: "Unit 5B",
            streetNumber: "456",
            streetName: "Richmond St",
            city: "London",
            province: "ON",
            postalCode: "N6A 3C7",
            lat: "42.9860",
            lng: "-81.2430"
        }),
        phone: "+1 555 234 5678"
    },
    {
        id: "3",
        firstName: "Alice",
        lastName: "Johnson",
        address: {
            streetNumber: "789",
            streetName: "Middlesex Dr",
            city: "London",
            province: "ON",
            postalCode: "N6G 4X6",
            lat: "43.0102",
            lng: "-81.2919"
        },
        fullName: generateFullName("Alice", "Johnson"),
        fullAddress: generateFullAddress({
            streetNumber: "789",
            streetName: "Middlesex Dr",
            city: "London",
            province: "ON",
            postalCode: "N6G 4X6",
            lat: "43.0102",
            lng: "-81.2919"
        }),
        phone: "+1 555 345 6789"
    },
    {
        id: "4",
        firstName: "Bob",
        lastName: "Brown",
        address: {
            unit: "Suite 203",
            streetNumber: "1010",
            streetName: "Dundas St",
            city: "London",
            province: "ON",
            postalCode: "N5W 2Y2",
            lat: "42.9847",
            lng: "-81.2484"
        },
        fullName: generateFullName("Bob", "Brown"),
        fullAddress: generateFullAddress({
            unit: "Suite 203",
            streetNumber: "1010",
            streetName: "Dundas St",
            city: "London",
            province: "ON",
            postalCode: "N5W 2Y2",
            lat: "42.9847",
            lng: "-81.2484"
        }),
        phone: "+1 555 456 7890"
    },
    {
        id: "5",
        firstName: "Charlie",
        lastName: "Davis",
        address: {
            unit: "Apt 22C",
            streetNumber: "2020",
            streetName: "Wonderland Rd N",
            city: "London",
            province: "ON",
            postalCode: "N6G 4X6",
            lat: "43.0134",
            lng: "-81.2914"
        },
        fullName: generateFullName("Charlie", "Davis"),
        fullAddress: generateFullAddress({
            unit: "Apt 22C",
            streetNumber: "2020",
            streetName: "Wonderland Rd N",
            city: "London",
            province: "ON",
            postalCode: "N6G 4X6",
            lat: "43.0134",
            lng: "-81.2914"
        }),
        phone: "+1 555 567 8901"
    },
    {
        id: "6",
        firstName: "David",
        lastName: "Miller",
        address: {
            streetNumber: "3030",
            streetName: "Adelaide St N",
            city: "London",
            province: "ON",
            postalCode: "N5X 2C7",
            lat: "42.9941",
            lng: "-81.2522"
        },
        fullName: generateFullName("David", "Miller"),
        fullAddress: generateFullAddress({
            streetNumber: "3030",
            streetName: "Adelaide St N",
            city: "London",
            province: "ON",
            postalCode: "N5X 2C7",
            lat: "42.9941",
            lng: "-81.2522"
        }),
        phone: "+1 555 678 9012"
    },
    {
        id: "7",
        firstName: "Eve",
        lastName: "Wilson",
        address: {
            unit: "Apt 12A",
            streetNumber: "4040",
            streetName: "Oxford St E",
            city: "London",
            province: "ON",
            postalCode: "N5Y 4S3",
            lat: "42.9900",
            lng: "-81.2212"
        },
        fullName: generateFullName("Eve", "Wilson"),
        fullAddress: generateFullAddress({
            unit: "Apt 12A",
            streetNumber: "4040",
            streetName: "Oxford St E",
            city: "London",
            province: "ON",
            postalCode: "N5Y 4S3",
            lat: "42.9900",
            lng: "-81.2212"
        }),
        phone: "+1 555 789 0123"
    },
    {
        id: "8",
        firstName: "Frank",
        lastName: "Moore",
        address: {
            streetNumber: "5050",
            streetName: "Highbury Ave N",
            city: "London",
            province: "ON",
            postalCode: "N5Y 5A2",
            lat: "42.9943",
            lng: "-81.2267"
        },
        fullName: generateFullName("Frank", "Moore"),
        fullAddress: generateFullAddress({
            streetNumber: "5050",
            streetName: "Highbury Ave N",
            city: "London",
            province: "ON",
            postalCode: "N5Y 5A2",
            lat: "42.9943",
            lng: "-81.2267"
        }),
        phone: "+1 555 890 1234"
    },
    {
        id: "9",
        firstName: "Grace",
        lastName: "Taylor",
        address: {
            unit: "Bldg 2, Apt 7",
            streetNumber: "6060",
            streetName: "Springbank Dr",
            city: "London",
            province: "ON",
            postalCode: "N6J 1H3",
            lat: "42.9765",
            lng: "-81.2830"
        },
        fullName: generateFullName("Grace", "Taylor"),
        fullAddress: generateFullAddress({
            unit: "Bldg 2, Apt 7",
            streetNumber: "6060",
            streetName: "Springbank Dr",
            city: "London",
            province: "ON",
            postalCode: "N6J 1H3",
            lat: "42.9765",
            lng: "-81.2830"
        }),
        phone: "+1 555 901 2345"
    },
    {
        id: "10",
        firstName: "Hank",
        lastName: "White",
        address: {
            streetNumber: "7070",
            streetName: "Sarnia Rd",
            city: "London",
            province: "ON",
            postalCode: "N6H 2Y1",
            lat: "42.9773",
            lng: "-81.2724"
        },
        fullName: generateFullName("Hank", "White"),
        fullAddress: generateFullAddress({
            streetNumber: "7070",
            streetName: "Sarnia Rd",
            city: "London",
            province: "ON",
            postalCode: "N6H 2Y1",
            lat: "42.9773",
            lng: "-81.2724"
        }),
        phone: "+1 555 012 3456"
    }
];

export const populateClients = async () => {
    const batch = writeBatch(FIREBASE_DB);

    clients.forEach((client) => {
        const clientRef = doc(FIREBASE_DB, 'clients', client.id);

        const clientData = {
            ...client
        }

        batch.set(clientRef, clientData);

    });

    console.log("Batch initiated");
    try {
        await batch.commit();
        console.log("Batch successful");
    } catch (err) {
        console.log("Batch Failed", err);
    }
}

export default clients;
