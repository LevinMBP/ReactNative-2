import { useUser } from "@/Context/UserContext";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigation() {
    const { user } = useUser();

    return user ? <AppNavigator /> : <AuthNavigator />
}