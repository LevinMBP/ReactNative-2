
import { createContext, useState, useContext, ReactNode, FC } from "react";

interface User {
    id: string;
    fullName: string;
    email: string;
    userType: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;