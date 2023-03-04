import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'

export type HomeStackNavigatorParamList = {
  Home: any
  Blog: { name: string }
  Blogger: { name: string }
  Article: { name: string }
}

export type BlogScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Blog'
>
export type BlogProfileScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Blogger'
>
export type ArticleScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Article'
>

export type HomeScreenNavigationProp = BlogScreenNavigationProp &
  BlogProfileScreenNavigationProp &
  ArticleScreenNavigationProp

export type BlogScreenRouteProp = RouteProp<HomeStackNavigatorParamList, 'Blog'>

export type BlogProfileScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Blogger'
>

export type ArticleScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Article'
>

export type BottomTabNavigatorParamList = {
  Profile: undefined
  HomeStack: HomeScreenNavigationProp
  Bermudas: undefined
}
