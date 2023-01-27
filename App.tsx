import {
    NavigationContainer,
    TabNavigationState,
} from "@react-navigation/native";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "./src/screens/ProfileScreen";
import BermudasScreen from "./src/screens/BermudasScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { BottomTabNavigationProp, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { RootStackScreenProps } from "./src/navigation/types";
import { registerRootComponent } from "expo";
import type {
    CompositeScreenProps,
    NavigatorScreenParams,
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator<RouteProp>();

export default function App() {

  interface TabBarIcon {
    icon: keyof typeof Ionicons.glyphMap
    focused: boolean
    color: string
    size: number
    // value: string
    // placeholder: string
    // onChangeText: (text: string) => void
    // secureTextEntry?: boolean
    // style: StyleProp<ViewStyle>
  }

  interface BottomTabNavigationOptions {
    //   navigation: BottomTabNavigationProp<RootParamList>;
      route: RouteProp<RootParamList, string>;
  }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }: BottomTabNavigationOptions ) => ({
                    tabBarStyle: {
                        backgroundColor: "#282a36",
                        height: 100,
                        paddingTop: 20,
                        paddingBottom: 20,
                    },

                    tabBarIcon: ({ focused, color, size }: TabBarIcon) => {
                        let iconName:String;
                        if (route.name === "Profile") {
                            iconName = focused
                                ? "person-circle"
                                : "person-circle-outline";
                        } else if (route.name === "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Bermudas") {
                            iconName = focused
                                ? "videocam"
                                : "videocam-outline";
                        }
                        return (
                            <Ionicons
                                name={iconName}
                                color={color}
                                size={size}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#ff79c6",
                    tabBarInactiveTintColor: "#f8f8f2",
                })}
            >
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Bermudas" component={BermudasScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
