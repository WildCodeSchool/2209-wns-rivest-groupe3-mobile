import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomTabNavigatorParamList } from "./types";
import HomeStackNavigator from "./HomeStack";
import FeedScreen from "../screens/BermudasScreen";
import SettingsScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabs;
