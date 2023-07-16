import { useState, useRef, useEffect, useContext } from 'react'
import { BermudasContext } from '../contexts/BermudasContext'
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { Camera, CameraType } from 'expo-camera'

import { useTheme } from '@react-navigation/native'
import { TabasColorTheme } from '../interfaces'
import { ActivityIndicator } from 'react-native-paper'

const CameraScreen = ({ navigation }: { navigation: any }) => {
  const { colors, fonts } = useTheme() as TabasColorTheme

  const { setLocalImage, setLocalVideo } = useContext(BermudasContext)

  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions()
  const [microphonePermission, requestMicrophonePermission] =
    Camera.useMicrophonePermissions()

  interface IPermissionMessage {
    camera: string | null
    microphone: string | null
  }
  const [permissionMessage, setPermissionMessage] =
    useState<IPermissionMessage>({
      microphone: null,
      camera: null,
    })

  const checkPermissions = () => {
    if (!cameraPermission) {
      const cameraMessage = {
        ...permissionMessage,
        camera: 'Autorisation caméra: pas de statut détecté',
      }
      setPermissionMessage(cameraMessage)
    }
    if (!microphonePermission) {
      const microphoneMessage = {
        ...permissionMessage,
        microphone: 'Autorisation microphone: pas de statut détecté',
      }
      setPermissionMessage(microphoneMessage)
    }
    if (!cameraPermission?.granted) requestCameraPermission()
    if (!microphonePermission?.granted) requestMicrophonePermission()
    navigation.navigate('Camera')
  }

  useEffect(() => {
    checkPermissions()
  }, [])

  const [loading, setLoading] = useState<boolean>(false)

  const [type, setType] = useState<CameraType>(CameraType.back)
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  const cameraRef = useRef<Camera | null>(null)
  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true)
      const photo = await cameraRef.current.takePictureAsync()
      setLocalVideo(null)
      setLocalImage(photo)
      setLoading(false)
      navigation.navigate('CreateBermuda')
    }
  }

  const [recording, setRecording] = useState(false)
  const [timer, setTimer] = useState<number>(30)
  useEffect(() => {
    let videoTimeout: any
    let videoTimer: any

    if (recording) {
      videoTimeout = setTimeout(() => {
        setRecording(false)
        cameraRef.current && cameraRef.current.stopRecording()
        navigation.navigate('CreateBermuda')
      }, 30000)

      videoTimer = setInterval(() => {
        setTimer((current) => current - 1)
      }, 1000)
    }

    if (!recording) {
      clearTimeout(videoTimeout)
      clearInterval(videoTimer)
      setTimer(30)
    }

    return () => {
      clearTimeout(videoTimeout)
      clearInterval(videoTimer)
      setTimer(30)
    }
  }, [recording])

  const recordVideo = async () => {
    if (cameraRef.current) {
      if (!microphonePermission?.granted) {
        requestMicrophonePermission()
        return
      }

      if (!recording) {
        setRecording(true)
        let video = await cameraRef.current.recordAsync({
          maxDuration: 30,
        })
        setLocalImage(null)
        setLocalVideo({ ...video, width: undefined, height: undefined })
      } else {
        setRecording(false)
        cameraRef.current.stopRecording()
        navigation.navigate('CreateBermuda')
      }
    }
  }

  if (!cameraPermission)
    return (
      <View style={main.container}>
        <View style={unauthorized.center}>
          {permissionMessage.camera && (
            <Text
              style={{
                ...unauthorized.message,
                fontFamily: fonts.default,
                color: colors.primary,
              }}
            >
              {permissionMessage.camera}
            </Text>
          )}
          {permissionMessage.microphone && (
            <Text
              style={{
                ...unauthorized.message,
                fontFamily: fonts.default,
                color: colors.primary,
              }}
            >
              {permissionMessage.microphone}
            </Text>
          )}
          <Button title="Retour" onPress={() => navigation.goBack()} />
        </View>
      </View>
    )

  if (!cameraPermission?.granted)
    return (
      <View style={main.container}>
        <View style={unauthorized.center}>
          <Text
            style={{
              ...unauthorized.message,
              fontFamily: fonts.default,
              color: colors.primary,
            }}
          >
            Pas d'accès à la caméra
          </Text>
          <TouchableOpacity
            style={{ ...main.button, backgroundColor: colors.highlight }}
            onPress={requestCameraPermission}
          >
            <Text
              style={{
                ...main.text,
                fontFamily: fonts.default,
                color: colors.card,
              }}
            >
              Autoriser Tabas.blog à accéder à la caméra
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )

  if (cameraPermission?.granted)
    return (
      <View style={main.container}>
        <Camera style={camera.camera} type={type} ref={cameraRef}>
          {loading && (
            <ActivityIndicator
              color={colors.highlight}
              size={'large'}
              animating={true}
              style={camera.loading}
            />
          )}
          <View style={camera.topContainer}>
            <Text
              style={[
                camera.timer,
                timer > 10
                  ? { color: colors.primary }
                  : { color: colors.notification },
              ]}
            >
              {recording && timer}
            </Text>
            <TouchableOpacity
              style={camera.exit}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="close" size={30} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={camera.bottomContainer}>
            {!microphonePermission?.granted && (
              <TouchableOpacity
                style={camera.authorization}
                onPress={requestMicrophonePermission}
              >
                <Text
                  style={{
                    ...camera.text,
                    color: colors.notification,
                    fontFamily: fonts.default,
                  }}
                >
                  Veuillez autoriser Tabas.blog à accéder au microphone pour
                  pouvoir enregistrer des vidéos
                </Text>
              </TouchableOpacity>
            )}
            <View style={camera.buttons}>
              <TouchableOpacity
                style={camera.button}
                onPress={toggleCameraType}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity style={camera.button} onPress={recordVideo}>
                <MaterialCommunityIcons
                  name="record-circle-outline"
                  size={40}
                  color={recording ? colors.notification : colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity style={camera.button} onPress={takePicture}>
                <Ionicons
                  name="camera-outline"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    )

  return <></>
}

export default CameraScreen

const main = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    margin: 10,
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 10,
  },
})

const unauthorized = StyleSheet.create({
  center: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    padding: 10,
    margin: 10,
    width: '100%',
    textAlign: 'center',
  },
})

const camera = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    position: 'relative',
  },
  topContainer: {
    flex: 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 0.16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttons: {
    flex: 0.5,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorization: {
    flex: 0.5,
    width: '80%',
  },
  exit: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  timer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    fontSize: 20,
  },
  loading: {
    position: 'absolute',
    zIndex: 20,
    alignSelf: 'center',
    top: '50%',
  },
})
