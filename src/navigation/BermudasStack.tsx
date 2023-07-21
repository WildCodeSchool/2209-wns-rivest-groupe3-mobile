import { BermudasContextProvider } from '../contexts/BermudasContext'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BermudasScreen from '../screens/BermudasScreen'
import CameraScreen from '../screens/CameraScreen'
import BermudasListScreen from '../screens/BermudasListScreen'

const BermudasStack = createNativeStackNavigator()

const BermudasStackNavigator = () => {
  return (
    <BermudasContextProvider>
      <BermudasStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <BermudasStack.Screen
          name="BermudasList"
          component={BermudasListScreen}
        />
        <BermudasStack.Screen name="CreateBermuda" component={BermudasScreen} />
        <BermudasStack.Screen name="Camera" component={CameraScreen} />
      </BermudasStack.Navigator>
    </BermudasContextProvider>
  )
}

export default BermudasStackNavigator
