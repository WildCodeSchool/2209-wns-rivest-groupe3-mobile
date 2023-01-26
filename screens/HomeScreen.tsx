import { Text, View, StyleSheet } from "react-native";

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <Text>Home Section</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
