import FavoriteList from "@/components/Lists/FavoriteList";
import { Colors } from "@/utility/Colors";
import { View, Text, StyleSheet } from "react-native";


function FavoritesScreen() {
    return (
        <View style={styles.container}>
            <FavoriteList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.lightGray
    }
})

export default FavoritesScreen