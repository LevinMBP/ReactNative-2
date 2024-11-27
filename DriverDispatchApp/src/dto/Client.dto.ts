

export interface ClientDTO {
    id: string;
    firstName: string;
    lastName: string;
    address: Address;
    fullName: string;
    fullAddress: string;
    phone: string;
}

interface Address {
    unit?: string;
    streetNumber: string;
    streetName: string;
    city: string;
    province: string;
    postalCode: string;
    lat: string;
    lng: string;
}

export const generateFullName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`;
};

export const generateFullAddress = (address: Address): string => {
    const unit = address.unit ? `#${address.unit} ` : '';
    return `${unit} ${address.streetNumber} ${address.streetName}, ${address.city}, ${address.province} ${address.postalCode}`;
};