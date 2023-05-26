import { ActivityIndicator, useColorScheme, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import Constants from 'expo-constants'
import { UserProvider } from './src/contexts/UserContext'
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
    border: 'hsl(202, 65%, 90%))',
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
    primary: '#f8f8f2',
    highlight: '#34A0B4',
    background: '#0B2534',
    card: 'rgb(255, 255, 255)',
    text: '#f8f8f2',
    border: 'hsl(202, 65%, 16%)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: {
    title: 'Lobster_400Regular',
    default: 'RobotoCondensed_400Regular',
  },
}

const API_URL = Constants.expoConfig?.extra?.apiUrl || ''

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
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
        <UserProvider>
          <BottomTabs />
        </UserProvider>
      </NavigationContainer>
    </ApolloProvider>
  )
}

// http://localhost:8000/users/29d39df2-ed43-46f2-945d-20f8e75c59ad/blogs/558efe15-5cfc-4c37-9c1a-2e536dbf7c92/covers/1677763049466-tabasblog-logopng
