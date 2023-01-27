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

<<<<<<< HEAD
export type DetailsScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Blog'
>

export type BottomTabNavigatorParamList = {
  Profile: undefined
  HomeStack: undefined
  Bermudas: undefined
}
=======
export type BlogScreenRouteProp = RouteProp<
    HomeStackNavigatorParamList,
    "Blog"
>;

export type BottomTabNavigatorParamList = {
    Home: HomeStackNavigatorParamList;
    Bermudas: undefined;
    Profile: undefined;
};
>>>>>>> b303edb42ae765d3adc23ca6a0884afb078b28f5
