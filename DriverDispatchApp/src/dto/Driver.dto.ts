

export interface DriverDTO {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    documentExpiry?: string;
    phone: string;
    driverStatus: "Active" | "Inactive" | "Suspended";
    startedAt: string;
}

export interface PartnerDTO {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    companyName: string;
    phone: string;
    status: "Active" | "Inactive" | "Suspended";
    startedAt: string;
}