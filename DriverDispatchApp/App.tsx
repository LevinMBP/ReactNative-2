import UserProvider from "@/Context/UserContext";
import RootNavigation from "@/Navigation";

export default function App() {
    return (
        <UserProvider>
            <RootNavigation />
        </UserProvider>
    );
}

