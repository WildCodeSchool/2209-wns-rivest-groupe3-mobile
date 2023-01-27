import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackNavigatorParamList } from './types'

<<<<<<< HEAD
import HomeScreen from '../screens/HomeScreen'
import DetailsScreen from '../screens/BlogScreen'
=======
import HomeScreen from "../screens/HomeScreen";
import BlogScreen from "../screens/BlogScreen";
>>>>>>> b303edb42ae765d3adc23ca6a0884afb078b28f5

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>()

const HomeStackNavigator = () => {
<<<<<<< HEAD
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Blog" component={DetailsScreen} />
    </HomeStack.Navigator>
  )
}
=======
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Blog" component={BlogScreen} />
        </HomeStack.Navigator>
    );
};
>>>>>>> b303edb42ae765d3adc23ca6a0884afb078b28f5

export default HomeStackNavigator
