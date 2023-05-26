import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileStackNavigatorParamList } from './types'
import LoginScreen from '../screens/LoginScreen'
import ProfileScreen from '../screens/ProfileScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { useContext } from 'react'
import { IUserContext, UserContext } from '../contexts/UserContext'

const ProfileStack =
  createNativeStackNavigator<ProfileStackNavigatorParamList>()

const ProfileStackScreen = () => {
  const { user } = useContext<IUserContext>(UserContext)
  if (user) {
    return <ProfileScreen />
  }

  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Group>
        <ProfileStack.Screen name="Login" component={LoginScreen} />
      </ProfileStack.Group>
      <ProfileStack.Group screenOptions={{ presentation: 'modal' }}>
        <ProfileStack.Screen name="Register" component={RegisterScreen} />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  )
}

export default ProfileStackScreen
