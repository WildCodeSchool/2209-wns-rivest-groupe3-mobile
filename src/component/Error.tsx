import { View, StyleSheet, Text } from 'react-native'
import { Title } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'

import { TabasColorTheme } from '../interfaces'
import { MaterialIcons } from '@expo/vector-icons'

const Error = ({ error }: { error: any }) => {
  const { colors, fonts } = useTheme() as TabasColorTheme
  return (
    <View style={main.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Title
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.text,
            fontFamily: fonts.title,
            fontSize: 40,
            lineHeight: 40,
          }}
        >
          Tabas.blog
        </Title>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: colors.text,
            textAlign: 'center',
            fontSize: 25,
          }}
        >
          Une erreur s'est produite !
        </Text>
        <Text
          style={{
            color: colors.text,
            textAlign: 'center',
            fontSize: 16,
          }}
        >
          {error.message}
        </Text>
      </View>
      <View
        style={{
          flex: 4,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <MaterialIcons
          name="error-outline"
          size={100}
          color={colors.notification}
        />
      </View>
    </View>
  )
}

export default Error

const main = StyleSheet.create({
  container: {
    flex: 1,
  },
})
