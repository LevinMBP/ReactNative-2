import { BookProvider } from '@/context/BookContext';
import RootNavigation from '@/navigation';

export default function App() {
    return (
        <BookProvider>
            <RootNavigation />
        </BookProvider>
    )
}
