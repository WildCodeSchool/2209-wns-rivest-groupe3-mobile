import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackNavigatorParamList } from './types'

import HomeScreen from '../screens/HomeScreen'
import DetailsScreen from '../screens/BlogScreen'

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>()

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Blog" component={DetailsScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator
