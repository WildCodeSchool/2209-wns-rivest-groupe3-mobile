import { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

import { AntDesign } from '@expo/vector-icons'

const LoadingLoop = ({
  loading,
  size,
  color,
  absolute,
}: {
  loading: boolean
  size: number
  color: string
  absolute: boolean
}) => {
  const AnimatedLogo = Animated.createAnimatedComponent(AntDesign)
  const rotationDegree = useRef(new Animated.Value(0)).current
  const loadingLoop = () => {
    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 360,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }

  useEffect(() => {
    loading && loadingLoop()
  }, [loading])

  return (
    <AnimatedLogo
      name="loading2"
      size={size}
      color={color}
      style={{
        position: absolute ? 'absolute' : undefined,
        zIndex: absolute ? 1000 : undefined,
        top: absolute ? '50%' : undefined,
        left: absolute ? '49%' : undefined,
        transform: [
          {
            rotateZ: rotationDegree.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
    />
  )
}

export default LoadingLoop
