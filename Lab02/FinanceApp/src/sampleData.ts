export interface Transaction {
    id: string;
    name: string;
    amount: string;
    date: string;
    details: string
}

export const transactions: Transaction[] = [
    {
        id: '1',
        name: 'Groceries',
        amount: '$50',
        date: '2024-10-20',
        details: 'Weekly grocery shopping at local supermarket.',
    },
    {
        id: '2',
        name: 'Gas',
        amount: '$30',
        date: '2024-10-21',
        details: 'Filled up the gas tank at the nearby station.',
    },
    {
        id: '3',
        name: 'Rent',
        amount: '$1200',
        date: '2024-10-01',
        details: 'Monthly rent payment for the apartment.',
    },
    {
        id: '4',
        name: 'Electricity Bill',
        amount: '$80',
        date: '2024-10-05',
        details: 'Payment for electricity usage for September.',
    },
    {
        id: '5',
        name: 'Water Bill',
        amount: '$25',
        date: '2024-10-07',
        details: 'Monthly water bill payment.',
    },
    {
        id: '6',
        name: 'Internet Bill',
        amount: '$60',
        date: '2024-10-10',
        details: 'Monthly internet service charge.',
    },
    {
        id: '7',
        name: 'Dining Out',
        amount: '$45',
        date: '2024-10-15',
        details: 'Dinner with friends at a local restaurant.',
    },
    {
        id: '8',
        name: 'Car Insurance',
        amount: '$200',
        date: '2024-10-12',
        details: 'Monthly premium for car insurance policy.',
    },
    {
        id: '9',
        name: 'Gym Membership',
        amount: '$40',
        date: '2024-10-18',
        details: 'Monthly fee for gym access.',
    },
    {
        id: '10',
        name: 'Online Subscription',
        amount: '$10',
        date: '2024-10-19',
        details: 'Monthly subscription for streaming service.',
    },
    {
        id: '11',
        name: 'Home Maintenance',
        amount: '$150',
        date: '2024-10-22',
        details: 'Plumbing repairs in the kitchen.',
    },
    {
        id: '12',
        name: 'Shopping',
        amount: '$120',
        date: '2024-10-25',
        details: 'Clothing and accessories shopping trip.',
    },
    {
        id: '13',
        name: 'Gift for Friend',
        amount: '$75',
        date: '2024-10-23',
        details: 'Birthday gift for a close friend.',
    },
    {
        id: '14',
        name: 'Medical Expenses',
        amount: '$90',
        date: '2024-10-26',
        details: 'Co-pay for doctor’s visit and prescription.',
    },
    {
        id: '15',
        name: 'Travel',
        amount: '$300',
        date: '2024-10-28',
        details: 'Flight tickets for upcoming vacation.',
    },
];