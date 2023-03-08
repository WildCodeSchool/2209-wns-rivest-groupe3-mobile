import { useTheme } from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native'
import { TabasColorTheme } from '../interfaces'

const BermudasScreen = () => {
  const { colors } = useTheme() as TabasColorTheme
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>
        Bermudas Screen
      </Text>
    </View>
  )
}

export default BermudasScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
