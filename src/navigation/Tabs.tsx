import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigatorParamList } from './types'
import HomeStackNavigator from './HomeStack'
import BermudasScreen from '../screens/BermudasScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { TabasColorTheme } from '../interfaces'

const BottomTabs = () => {
  const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()
  const { colors } = useTheme() as TabasColorTheme
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} style={'auto'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.background,
            paddingTop: 10,
            justifyContent: 'center',
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'person'

            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline'
            } else if (route.name === 'HomeStack') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Bermudas') {
              iconName = focused ? 'videocam' : 'videocam-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: colors.highlight,
          tabBarInactiveTintColor: colors.text,
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Bermudas" component={BermudasScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default BottomTabs
