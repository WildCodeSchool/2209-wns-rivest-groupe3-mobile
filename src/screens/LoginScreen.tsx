import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { Link, useTheme } from '@react-navigation/native'
import { TabasColorTheme } from '../interfaces'
import { useState } from 'react'

const LoginScreen = () => {
  const { colors } = useTheme() as TabasColorTheme
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    console.log('login')
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
                fontWeight: 'bold',
                fontSize: 20,
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
                  backgroundColor: colors.primary,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 6,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: '#f8f8f2',
                    fontWeight: 'bold',
                    fontSize: 18,
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
