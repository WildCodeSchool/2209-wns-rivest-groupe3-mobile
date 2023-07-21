import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

interface ILargeButtonProps {
  text: string
  width: DimensionValue | undefined
  backgroundColor: string
  color: string
  fontFamily: string
  onPress?: () => any
}
const LargeButton = ({
  text,
  width,
  backgroundColor,
  color,
  fontFamily,
  onPress,
}: ILargeButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        style.button,
        {
          width,
          backgroundColor,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          ...style.text,
          color,
          fontFamily,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default LargeButton

const style = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 10,
  },
})
