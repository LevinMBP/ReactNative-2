import { TouchableOpacity, StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import HeartIcon from '@expo/vector-icons/AntDesign';
import { Colors } from "@/utility/Colors";
import { useEffect, useState } from "react";
import { EventType } from "@/dto/Event.dto";
import { addUserToFavorites, removeUserToFavorites } from "@/controllers/Favorites";
import { useUser } from "@/context/UserContext";

function FavoriteButton({ event }: { event: EventType }) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = async (event: EventType) => {
        if (user?.id && !isFavorite) {
            setLoading(true);
            await addUserToFavorites(event.id, user.id);
            setLoading(false);
            Alert.alert("Sucessfully added to favorites");
        }
        else if (user?.id && isFavorite) {
            setLoading(true);
            await removeUserToFavorites(event.id, user.id);
            setLoading(false);
            Alert.alert("Sucessfully removed to favorites");
        }
    }

    useEffect(() => {
        if (user?.id) {
            // Check if user.id is in the event's favorites
            const isUserFavorite = event.favorites.some(item => item.userId === user.id);
            setIsFavorite(isUserFavorite);
        }
    }, [event.favorites, user?.id])

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <TouchableOpacity
            onPress={() => handleToggleFavorite(event)}
            style={styles.heartContainer}>
            <HeartIcon
                name={isFavorite ? 'heart' : 'hearto'}
                size={24}
                color={Colors.lightPink}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    heartContainer: {
        alignItems: 'center',
        marginTop: 10,
        width: 30,
    },
    // loadingContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
})

export default FavoriteButton