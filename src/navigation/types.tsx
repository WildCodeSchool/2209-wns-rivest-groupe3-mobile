import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'

export type HomeStackNavigatorParamList = {
  Home: undefined
  Blog: {
    name: string
  }
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Blog'
>

export type DetailsScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Blog'
>

export type BottomTabNavigatorParamList = {
  Profile: undefined
  HomeStack: undefined
  Bermudas: undefined
}
