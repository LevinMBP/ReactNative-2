import { v4 as uuidv4 } from "uuid";
import { BorrowedBookDTO } from "./Book.dto";

export interface Address {
    aptSuiteNo?: string;
    streetNumber: string;
    streetName: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface UserDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: Address;
    currentBorrowedBooks: BorrowedBookDTO[]; // Array to store current borrowed books
    previousBorrowedBooks: BorrowedBookDTO[];
}


// // Example of creating a user with auto-generated ID
// const createUser = (email: string, firstName: string, lastName: string, phoneNumber: string, address: Address): UserDTO => {
//   return {
//     id: uuidv4(),         // Generates a unique ID for the user
//     email,
//     firstName,
//     lastName,
//     phoneNumber,
//     address
//   };
// };

// // Example usage:
// const user: UserDTO = createUser(
//   "johndoe@example.com",
//   "John",
//   "Doe",
//   "+1-555-123-4567",
//   {
//     aptSuiteNo: "Apt 101",  // Optional
//     streetNumber: "123",
//     streetName: "Main St.",
//     city: "Toronto",
//     province: "Ontario",
//     postalCode: "M5A 1A1"
//   }
// );

// console.log(user);