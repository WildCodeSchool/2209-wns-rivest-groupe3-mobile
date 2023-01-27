import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../navigation/types";

const DATA = [
    {
        id: 1,
        name: "blog1",
    },
    {
        id: 2,
        name: "blog2",
    },
    {
        id: 3,
        name: "blog3",
    },
    {
        id: 4,
        name: "blog4",
    },
    {
        id: 5,
        name: "blog5",
    },
];

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const renderListItems = ({ item }) => {
        return (
            <Pressable
                onPress={() =>
                    navigation.navigate("Blog", {
                        name: item.name,
                    })
                }
            >
                <Text>
                    {item.name}
                </Text>
                <View
                    style={{
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: "#ccc",
                    }}
                />
            </Pressable>
        );
    };

    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <FlatList data={DATA} renderItem={renderListItems} />
        </View>
    );
};

export default HomeScreen;
