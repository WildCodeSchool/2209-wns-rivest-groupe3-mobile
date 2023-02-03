import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackNavigatorParamList } from './types'

import HomeScreen from '../screens/HomeScreen'
import BlogScreen from '../screens/BlogScreen'
import BlogProfileScreen from '../screens/BlogProfileScreen'
import ArticleScreen from '../screens/ArticleScreen'

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>()

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Blog" component={BlogScreen} />
      <HomeStack.Screen name="BlogProfile" component={BlogProfileScreen} />
      <HomeStack.Screen name="Article" component={ArticleScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator
