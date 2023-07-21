import { StyleSheet, View } from 'react-native'

interface IFrameProps {
  width: number | string
  cornerLength: number
  cornerWidth: number
  color: string
}
const Frame = ({ width, cornerLength, cornerWidth, color }: IFrameProps) => {
  return (
    <View style={{ ...main.container, width }}>
      <View
        style={{
          ...corner.topLeft,
          height: cornerWidth,
          width: cornerLength,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          ...corner.topRight,
          height: cornerWidth,
          width: cornerLength,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          ...corner.bottomLeft,
          height: cornerWidth,
          width: cornerLength,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          ...corner.bottomRight,
          height: cornerWidth,
          width: cornerLength,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          ...corner.leftUp,
          height: cornerLength,
          width: cornerWidth,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          ...corner.leftDown,
          height: cornerLength,
          width: cornerWidth,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          ...corner.rightUp,
          height: cornerLength,
          width: cornerWidth,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          ...corner.rightDown,
          height: cornerLength,
          width: cornerWidth,
          backgroundColor: color,
        }}
      />
    </View>
  )
}

export default Frame

const main = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    position: 'relative',
  },
})
const corner = StyleSheet.create({
  topLeft: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 0,
    left: 0,
  },
  topRight: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 0,
    right: 0,
  },
  bottomLeft: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
    right: 0,
  },
  leftUp: {
    position: 'absolute',
    backgroundColor: 'red',
    left: 0,
    top: 0,
  },
  leftDown: {
    position: 'absolute',
    backgroundColor: 'red',
    left: 0,
    bottom: 0,
  },
  rightUp: {
    position: 'absolute',
    backgroundColor: 'red',
    right: 0,
    top: 0,
  },
  rightDown: {
    position: 'absolute',
    backgroundColor: 'red',
    right: 0,
    bottom: 0,
  },
})
