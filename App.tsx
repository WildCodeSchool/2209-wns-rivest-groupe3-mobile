import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import BottomTabs from './src/navigation/Tabs'
import { TabasColorTheme } from './src/interfaces'

const TabasLightTheme: TabasColorTheme = {
  dark: false,
  colors: {
    primary: '#0B2534',
    background: '#f8f8f2',
    highlight: '#34A0B4',
    card: 'rgb(255, 255, 255)',
    text: '#0B2534',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
}
const TabasDarkTheme: TabasColorTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    highlight: '#34A0B4',
    background: '#0B2534',
    card: 'rgb(255, 255, 255)',
    text: '#f8f8f2',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
}

export default function App() {
  const scheme = useColorScheme()

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? TabasDarkTheme : TabasLightTheme}
    >
      <BottomTabs />
    </NavigationContainer>
  )
}
