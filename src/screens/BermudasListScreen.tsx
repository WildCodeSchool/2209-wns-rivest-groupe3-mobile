import { useTheme } from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native'
import { TabasColorTheme } from '../interfaces'
import LargeButton from '../component/LargeButton'

const BermudasListScreen = ({ navigation }: { navigation: any }) => {
  const { colors, fonts } = useTheme() as TabasColorTheme

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>
        Bermudas
      </Text>
      <LargeButton
        text="NOUVEAU BERMUDA"
        width="80%"
        backgroundColor={colors.primary}
        color={colors.background}
        fontFamily={fonts.default}
        onPress={() => navigation.navigate('CreateBermuda')}
      />
    </View>
  )
}

export default BermudasListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
