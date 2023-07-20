import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native'
import { Link, useTheme } from '@react-navigation/native'
import { TabasColorTheme } from '../interfaces'
import { useState } from 'react'

const RegisterScreen = () => {
  const { colors, fonts } = useTheme() as TabasColorTheme
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nickname, setNickname] = useState('')

  const login = async () => {
    console.log('login')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%', paddingTop: '25%' }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 30,
            }}
          >
            Créez votre compte
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
                borderColor: colors.highlight,
              }}
              placeholder="Mot de passe"
              onChangeText={(newText) => setPassword(newText)}
              defaultValue={password}
              autoCorrect={false}
              autoComplete={'password-new'}
            />
            <TextInput
              secureTextEntry={true}
              style={{
                ...styles.input,
                borderColor: colors.highlight,
              }}
              placeholder="Confirmation du mot de passe"
              onChangeText={(newText) => setConfirmPassword(newText)}
              defaultValue={confirmPassword}
              autoCorrect={false}
              autoComplete={'password-new'}
            />
            <TextInput
              style={{
                ...styles.input,
                color: colors.text,
                borderColor: colors.highlight,
              }}
              placeholder="Pseudo"
              onChangeText={(newText) => setNickname(newText)}
              defaultValue={nickname}
              autoCorrect={false}
              autoComplete={'username-new'}
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
                ENREGISTRER
              </Text>
            </Pressable>
            <Link to={{ screen: 'Login' }} style={{ color: colors.highlight }}>
              Déjà membre ?
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default RegisterScreen

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
