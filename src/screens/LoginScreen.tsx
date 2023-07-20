import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import { Link, useTheme } from '@react-navigation/native'
import { TabasColorTheme } from '../interfaces'
import { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_TOKEN } from '../gql/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { IUser, IUserContext, UserContext } from '../contexts/UserContext'

const LoginScreen = () => {
  const { colors, fonts } = useTheme() as TabasColorTheme
  const { setUser } = useContext<IUserContext>(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadToken] = useMutation(GET_TOKEN)

  const login = async () => {
    loadToken({
      variables: {
        email,
        password,
      },
    })
      .then(async (res) => {
        const { user, token } = res.data.login
        await SecureStore.setItemAsync('token', token)
        const localUser = {
          id: user.id,
          nickname: user.nickname,
          avatar: user.avatar,
        } as IUser
        await AsyncStorage.setItem('loggedUser', JSON.stringify(localUser))
        setUser(localUser)
      })
      .catch((error) => {
        console.error(error)
        Alert.alert('Error', error.message)
      })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ ...styles.container, width: '100%' }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: fonts.title,
                fontWeight: 'bold',
                fontSize: 30,
              }}
            >
              Connexion
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <View style={{ width: '100%', alignItems: 'center', flex: 0.8 }}>
              <TextInput
                style={{
                  ...styles.input,
                  color: colors.text,
                  borderColor: colors.highlight,
                }}
                placeholder="Email"
                onChangeText={(newText) => setEmail(newText)}
                defaultValue={email}
                autoCorrect={false}
                autoComplete={'email'}
                keyboardType={'email-address'}
              />
              <TextInput
                secureTextEntry={true}
                style={{
                  ...styles.input,
                  color: colors.text,
                  borderColor: colors.highlight,
                }}
                placeholder="Mot de passe"
                onChangeText={(newText) => setPassword(newText)}
                defaultValue={password}
                autoCorrect={false}
                autoComplete={'password'}
              />
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flex: 1.2,
                justifyContent: 'center',
              }}
            >
              <Pressable
                onPress={login}
                style={{
                  backgroundColor: colors.highlight,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 6,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily: fonts.default,
                  }}
                >
                  CONNEXION
                </Text>
              </Pressable>
              <Link
                to={{ screen: 'Register' }}
                style={{ color: colors.highlight }}
              >
                Pas encore de compte ?
              </Link>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    height: 70,
    width: '80%',
    marginBottom: 30,
  },
})
