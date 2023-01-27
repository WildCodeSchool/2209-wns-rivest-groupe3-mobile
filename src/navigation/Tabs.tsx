import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigatorParamList } from "./types";
import HomeStackNavigator from "./HomeStack";
import BermudasScreen from "../screens/BermudasScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: "#282a36",
                    height: 100,
                    paddingTop: 20,
                    paddingBottom: 20,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Bermudas") {
                        iconName = focused ? "videocam" : "videocam-outline";
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "#50fa7b",
                tabBarInactiveTintColor: "#f8f8f2",
            })}
        >
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Bermudas" component={BermudasScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabs;
