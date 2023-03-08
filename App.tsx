import { ActivityIndicator, useColorScheme, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { API_URL } from '@env'
import {
  useFonts,
  RobotoCondensed_300Light,
  RobotoCondensed_400Regular,
  RobotoCondensed_700Bold,
} from '@expo-google-fonts/roboto-condensed'
import { Lobster_400Regular } from '@expo-google-fonts/lobster'
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
  fonts: {
    title: 'Lobster_400Regular',
    default: 'RobotoCondensed_400Regular',
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
  fonts: {
    title: 'Lobster_400Regular',
    default: 'RobotoCondensed_400Regular',
  },
}

const httpLink = createHttpLink({
  uri: API_URL,
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default function App() {
  const scheme = useColorScheme()
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
    RobotoCondensed_400Regular,
  })

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer
        theme={scheme === 'dark' ? TabasDarkTheme : TabasLightTheme}
      >
        <BottomTabs />
      </NavigationContainer>
    </ApolloProvider>
  )
}
