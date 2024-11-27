import { FleetDTO } from "@/dto/Fleet.dto";
import { View, FlatList, StyleSheet, Text } from "react-native";

// import { sampleFleets } from "@/Resources/SampleFleetData";
import FleetsItem from "../ListItem/FleetsItem";
import { useEffect, useState } from "react";
import { listenToFleets } from "@/Controllers/FleetController";
import { useUser } from "@/Context/UserContext";


function FleetList({ navigation }: { navigation: any }) {
    const { user } = useUser();

    const [fleets, setFleets] = useState<FleetDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleItemPress = (fleet: FleetDTO) => {
        // Navigate to FleetDetails and pass fleetId as a parameter
        navigation.navigate("FleetDetails", { fleet });
    }

    const renderItem = ({ item }: { item: FleetDTO }) => {
        return <FleetsItem item={item} onPress={handleItemPress} navigation={navigation} />
    }

    useEffect(() => {
        const unsubscribe = listenToFleets((fleetList) => {
            setFleets(fleetList);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <View style={styles.container}>
            {user?.userType === 'Driver' ? (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500'
                    }}>We're currently working on this feature.</Text>
                </View>
            ) : (
                <FlatList
                    data={fleets}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <View>
                            <Text>No fleets available right now. Please check back later!</Text>
                        </View>
                    }
                    ListFooterComponent={<View style={styles.footerSpacing} />}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footerSpacing: {
        height: 80,
    },
});

export default FleetList;