import { DriverDTO } from "./Driver.dto";
import { OrderDTO } from "./Order.dto";

interface WorkingTime {
    start: string;
    end: string;
    duration: number;
}

export interface FleetDTO {
    id: string;
    date: Date;
    drivingDistance: number;
    workingTime: WorkingTime;
    isAvailable: "Available" | "Accepted" | "Completed"; // Available if driver has not accepted yet.
    isCompleted: boolean;
    driver?: DriverDTO;
    orders: OrderDTO[]; // Fleet should have atleast one order
    createdAt: Date;
}