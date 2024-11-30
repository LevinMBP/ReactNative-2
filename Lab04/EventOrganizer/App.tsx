import UserProvider from '@/context/UserContext';
import RootNavigation from '@/navigation';

export default function App() {
    return (
        <UserProvider>
            <RootNavigation />
        </UserProvider>
    );
}
