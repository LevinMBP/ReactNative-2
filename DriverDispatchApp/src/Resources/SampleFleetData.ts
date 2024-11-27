import { FleetDTO } from "@/dto/Fleet.dto";

// export const sampleFleets: FleetDTO[] = [
//     {
//         id: "fleet-1",
//         date: "2024-11-10",
//         drivingDistance: 150,
//         workingTime: {
//             start: "08:00 AM",
//             end: "05:00 PM",
//             duration: "9 hours",
//         },
//         isAvailable: true,
//         isCompleted: false,
//         driver: {
//             id: "driver-1",
//             firstName: "John",
//             lastName: "Smith",
//             fullName: "John Smith",
//             documentExpiry: "2025-12-31",
//             phone: "555-1234",
//             driverStatus: "Active",
//             startedAt: "2019-04-15",
//         },
//         orders: [
//             {
//                 id: "order-1",
//                 client: {
//                     firstName: "Alice",
//                     lastName: "Brown",
//                     phone: "555-9876",
//                     address: {
//                         unit: "Apt 1",
//                         streetNumber: "123",
//                         streetName: "Main St",
//                         city: "Cityville",
//                         province: "State",
//                         postalCode: "12345",
//                         lat: "40.7128",
//                         lng: "-74.0060",
//                     },
//                 },
//                 items: [
//                     { item: "box", quantity: 2, price: 10 },
//                     { item: "meds", quantity: 5, price: 20 },
//                 ],
//                 status: "open",
//                 createdAt: "2024-11-01",
//                 fleetId: "fleet-1",
//             },
//             {
//                 id: "order-2",
//                 client: {
//                     firstName: "Bob",
//                     lastName: "Carter",
//                     phone: "555-6543",
//                     address: {
//                         unit: "Apt 2",
//                         streetNumber: "456",
//                         streetName: "Elm St",
//                         city: "Townsville",
//                         province: "Region",
//                         postalCode: "67890",
//                         lat: "40.7128",
//                         lng: "-74.0060",
//                     },
//                 },
//                 items: [
//                     { item: "bag", quantity: 1, price: 5 },
//                     { item: "tpn", quantity: 3, price: 15 },
//                 ],
//                 status: "completed",
//                 createdAt: "2024-11-03",
//                 fleetId: "fleet-1",
//             },
//         ],
//     },
//     {
//         id: "fleet-2",
//         date: "2024-11-11",
//         drivingDistance: 200,
//         workingTime: {
//             start: "07:00 AM",
//             end: "04:00 PM",
//             duration: "9 hours",
//         },
//         isAvailable: false,
//         isCompleted: false,
//         driver: {
//             id: "driver-2",
//             firstName: "Sarah",
//             lastName: "Lee",
//             fullName: "Sarah Lee",
//             documentExpiry: "2026-01-01",
//             phone: "555-2345",
//             driverStatus: "Active",
//             startedAt: "2020-08-20",
//         },
//         orders: [
//             {
//                 id: "order-3",
//                 client: {
//                     firstName: "Charlie",
//                     lastName: "Green",
//                     phone: "555-1122",
//                     address: {
//                         unit: "Apt 3",
//                         streetNumber: "789",
//                         streetName: "Pine St",
//                         city: "Villagetown",
//                         province: "ProvinceX",
//                         postalCode: "98765",
//                         lat: "40.7128",
//                         lng: "-74.0060",
//                     },
//                 },
//                 items: [
//                     { item: "pole", quantity: 2, price: 30 },
//                     { item: "box", quantity: 1, price: 10 },
//                 ],
//                 status: "dispatched",
//                 createdAt: "2024-11-05",
//                 fleetId: "fleet-2",
//             },
//             {
//                 id: "order-4",
//                 client: {
//                     firstName: "David",
//                     lastName: "Harris",
//                     phone: "555-4455",
//                     address: {
//                         unit: "Suite 2",
//                         streetNumber: "654",
//                         streetName: "Birch Rd",
//                         city: "Lakeside",
//                         province: "RegionY",
//                         postalCode: "11223",
//                         lat: "40.7128",
//                         lng: "-74.0060",
//                     },
//                 },
//                 items: [
//                     { item: "tpn", quantity: 1, price: 25 },
//                     { item: "meds", quantity: 3, price: 20 },
//                 ],
//                 status: "canceled",
//                 createdAt: "2024-11-06",
//                 fleetId: "fleet-2",
//             },
//         ],
//     },
//     {
//         id: "fleet-3",
//         date: "2024-11-12",
//         drivingDistance: 120,
//         workingTime: {
//             start: "09:00 AM",
//             end: "06:00 PM",
//             duration: "9 hours",
//         },
//         isAvailable: true,
//         isCompleted: false,
//         driver: {
//             id: "driver-3",
//             firstName: "David",
//             lastName: "Williams",
//             fullName: "David Williams",
//             documentExpiry: "2024-12-31",
//             phone: "555-3456",
//             driverStatus: "Active",
//             startedAt: "2018-05-10",
//         },
//         orders: [
//             {
//                 id: "order-5",
//                 client: {
//                     firstName: "Emma",
//                     lastName: "Johnson",
//                     phone: "555-6789",
//                     address: {
//                         unit: "Apt 4",
//                         streetNumber: "321",
//                         streetName: "Oak St",
//                         city: "Hometown",
//                         province: "StateZ",
//                         postalCode: "13579",
//                         lat: "40.7128",
//                         lng: "-74.0060",
//                     },
//                 },
//                 items: [
//                     { item: "box", quantity: 3, price: 8 },
//                 ],
//                 status: "open",
//                 createdAt: "2024-11-07",
//                 fleetId: "fleet-3",
//             },
//         ],
//     },
//     {
//         id: "fleet-4",
//         date: "2024-11-13",
//         drivingDistance: 175,
//         workingTime: {
//             start: "08:30 AM",
//             end: "05:30 PM",
//             duration: "9 hours",
//         },
//         isAvailable: false,
//         isCompleted: false,
//         driver: {
//             id: "driver-4",
//             firstName: "Emily",
//             lastName: "Davis",
//             fullName: "Emily Davis",
//             documentExpiry: "2025-11-30",
//             phone: "555-4567",
//             driverStatus: "Active",
//             startedAt: "2021-02-01",
//         },
//         orders: [
//             {
//                 id: "order-6",
//                 client: {
//                     firstName: "Fay",
//                     lastName: "Clark",
//                     phone: "555-7890",
//                     address: {
//                         unit: "Apt 5",
//                         streetNumber: "321",
//                         streetName: "Willow St",
//                         city: "Riverside",
//                         province: "StateP",
//                         postalCode: "24680",
//                         lat: "40.7128",
//                         lng: "-74.0060",
//                     },
//                 },
//                 items: [
//                     { item: "pole", quantity: 1, price: 50 },
//                     { item: "tpn", quantity: 4, price: 15 },
//                 ],
//                 status: "completed",
//                 createdAt: "2024-11-08",
//                 fleetId: "fleet-4",
//             },
//         ],
//     },
//     {
//         id: "fleet-5",
//         date: "2024-11-14",
//         drivingDistance: 220,
//         workingTime: {
//             start: "10:00 AM",
//             end: "07:00 PM",
//             duration: "9 hours",
//         },
//         isAvailable: true,
//         isCompleted: false,
//         driver: {
//             id: "driver-5",
//             firstName: "Michael",
//             lastName: "Johnson",
//             fullName: "Michael Johnson",
//             documentExpiry: "2027-01-01",
//             phone: "555-5678",
//             driverStatus: "Active",
//             startedAt: "2017-06-15",
//         },
//         orders: [
//             {
//                 id: "order-7",
//                 client: {
//                     firstName: "Grace",
//                     lastName: "Taylor",
//                     phone: "555-3210",
//                     address: {
//                         unit: "Apt 6",
//                         streetNumber: "987",
//                         streetName: "Sunset Blvd",
//                         city: "Sunset City",
//                         province: "RegionQ",
//                         postalCode: "98765",
//                         lat: "40.7128",
//                         lng: "-74.0060",
//                     },
//                 },
//                 items: [
//                     { item: "box", quantity: 4, price: 8 },
//                 ],
//                 status: "open",
//                 createdAt: "2024-11-09",
//                 fleetId: "fleet-5",
//             },
//             {
//                 id: "order-8",
//                 client: {
//                     firstName: "Hannah",
//                     lastName: "Moore",
//                     phone: "555-4321",
//                     address: {
//                         unit: "Suite 1",
//                         streetNumber: "123",
//                         streetName: "Park Ave",
//                         city: "Green City",
//                         province: "StateG",
//                         postalCode: "54321",
//                         lat: "40.7128",
//                         lng: "-74.0060",
//                     },
//                 },
//                 items: [
//                     { item: "meds", quantity: 6, price: 12 },
//                 ],
//                 status: "dispatched",
//                 createdAt: "2024-11-10",
//                 fleetId: "fleet-5",
//             },
//         ],
//     },
// ];


const Fleet: FleetDTO[] = [
    {
        id: "F001",
        date: new Date("2024-11-25T08:00:00Z"),
        drivingDistance: 60,
        workingTime: {
            start: "2024-11-25T08:00:00Z",
            end: "2024-11-25T11:30:00Z",
            duration: 3.5,
        },
        isAvailable: "Available",
        isCompleted: false,
        driver: undefined,
        orders: [
            {
                id: "order2",
                client: {
                    id: "2",
                    firstName: "Jane",
                    lastName: "Smith",
                    fullName: "Jane Smith",
                    address: {
                        unit: "Unit 5B",
                        streetNumber: "456",
                        streetName: "Broadway",
                        city: "Los Angeles",
                        province: "CA",
                        postalCode: "90001",
                        lat: "34.052235",
                        lng: "-118.243683"
                    },
                    fullAddress: "Unit 5B 456 Broadway, Los Angeles, CA 90001",
                    phone: "+1 555 234 5678"
                },
                items: [
                    { item: "Pole", quantity: 2 }
                ],
                status: "Assigned",
                createdAt: new Date("2024-11-16T13:30:00.000Z"),
                date: new Date("2024-11-25T09:00:00Z"),
                fleetId: "F001",
                notes: { amountTobePaid: 150 }
            }
        ],
    },
    {
        id: "F002",
        date: new Date("2024-11-25T10:00:00Z"),
        drivingDistance: 80,
        workingTime: {
            start: "2024-11-25T10:00:00Z",
            end: "2024-11-25T14:00:00Z",
            duration: 4,
        },
        isAvailable: "Available",
        isCompleted: false,
        driver: undefined,
        orders: [
            {
                id: "order3",
                client: {
                    id: "3",
                    firstName: "Alice",
                    lastName: "Johnson",
                    fullName: "Alice Johnson",
                    address: {
                        unit: "Apt 12A",
                        streetNumber: "789",
                        streetName: "Sunset Blvd",
                        city: "San Francisco",
                        province: "CA",
                        postalCode: "94110",
                        lat: "37.774929",
                        lng: "-122.419418"
                    },
                    fullAddress: "Apt 12A 789 Sunset Blvd, San Francisco, CA 94110",
                    phone: "+1 555 345 6789"
                },
                items: [
                    { item: "Meds", quantity: 1 },
                    { item: "Box", quantity: 5 }
                ],
                status: "Assigned",
                createdAt: new Date("2024-11-16T14:15:00.000Z"),
                date: new Date("2024-11-25T10:00:00Z"),
                fleetId: "F002",
                notes: { instruction: "Handle with care" }
            }
        ],
    },
    {
        id: "F003",
        date: new Date("2024-11-25T07:30:00Z"),
        drivingDistance: 100,
        workingTime: {
            start: "2024-11-25T07:30:00Z",
            end: "2024-11-25T12:30:00Z",
            duration: 5,
        },
        isAvailable: "Available",
        isCompleted: false,
        driver: undefined,
        orders: [
            {
                id: "order1",
                client: {
                    id: "1",
                    firstName: "John",
                    lastName: "Doe",
                    fullName: "John Doe",
                    address: {
                        unit: "Apt 101",
                        streetNumber: "123",
                        streetName: "Main St",
                        city: "New York",
                        province: "NY",
                        postalCode: "10001",
                        lat: "40.712776",
                        lng: "-74.005974"
                    },
                    fullAddress: "Apt 101 123 Main St, New York, NY 10001",
                    phone: "+1 555 123 4567"
                },
                items: [
                    { item: "Bag", quantity: 3 },
                    { item: "Box", quantity: 1 }
                ],
                status: "Assigned",
                createdAt: new Date("2024-11-16T12:00:00.000Z"),
                date: new Date("2024-11-25T09:00:00Z"),
                fleetId: "F003",
                notes: { instruction: "Please deliver after 5 PM." }
            },
            {
                id: "order4",
                client: {
                    id: "4",
                    firstName: "Bob",
                    lastName: "Brown",
                    fullName: "Bob Brown",
                    address: {
                        unit: "Suite 203",
                        streetNumber: "1010",
                        streetName: "Market St",
                        city: "Chicago",
                        province: "IL",
                        postalCode: "60601",
                        lat: "41.878113",
                        lng: "-87.629799"
                    },
                    fullAddress: "Suite 203 1010 Market St, Chicago, IL 60601",
                    phone: "+1 555 456 7890"
                },
                items: [
                    { item: "Box", quantity: 3 },
                    { item: "TPN", quantity: 2 }
                ],
                status: "Assigned",
                createdAt: new Date("2024-11-16T15:00:00.000Z"),
                date: new Date("2024-11-25T11:00:00Z"),
                fleetId: "F003",
                notes: { instruction: "Deliver by noon" }
            }
        ],
    }
]