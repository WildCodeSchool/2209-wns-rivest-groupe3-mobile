import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "./screens/ProfileScreen";
import BermudasScreen from "./screens/BermudasScreen";
import HomeScreen from "./screens/HomeScreen";
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {

  interface TabBarIcon {
    icon: keyof typeof Ionicons.glyphMap
    focused: boolean
    color: string
    // value: string
    // placeholder: string
    // onChangeText: (text: string) => void
    // secureTextEntry?: boolean
    // style: StyleProp<ViewStyle>
  }

    return (

        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }:  ) => ({

                    tabBarStyle: {  backgroundColor: "#282a36",
                                    height: 100,
                                    paddingTop: 20,
                                    paddingBottom: 20, },

                    tabBarIcon: ({ focused, color }: TabBarIcon) => {
                        let iconName;
                        if (route.name === "Profile") {
                            iconName = focused ? "person-circle" : "person-circle-outline";
                        } else if (route.name === "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Bermudas") {
                            iconName = focused ? "videocam" : "videocam-outline";
                        }
                        return (
                            <Ionicons name={iconName} color={color} />
                        );
                    },
                    tabBarActiveTintColor: "#ff79c6",
                    tabBarInactiveTintColor: "#f8f8f2",
                })}
            >
                <Tab.Screen name="Profile" component ={ProfileScreen} />
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Bermudas" component={BermudasScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({
//     tabBar: {
//         backgroundColor: "#282a36",
//         height: 100,
//         paddingTop: 20,
//         paddingBottom: 20,
//     },
// });
