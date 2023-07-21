import { useState, useContext, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import Constants from 'expo-constants'

import { TabasColorTheme } from '../interfaces'
import { BermudasContext } from '../contexts/BermudasContext'
import Frame from '../component/Frame'
import LargeButton from '../component/LargeButton'
import { useMutation } from '@apollo/client'
import { CREATE_BERMUDA } from '../queries/Bermudas'

const BermudasScreen = ({ navigation }: { navigation: any }) => {
  const { colors, fonts } = useTheme() as TabasColorTheme

  const { localImage, setLocalImage, localVideo, setLocalVideo } =
    useContext(BermudasContext)

  const [loading, setLoading] = useState<boolean>(false)
  const [text, setText] = useState('')

  const [libraryStatus, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions()

  const alert = (message: string, navigate: boolean) => {
    Alert.alert(
      '',
      message,
      [
        {
          text: 'OK',
          onPress: () => navigate && navigation.navigate('BermudasList'),
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  const [createBermuda, { error }] = useMutation(CREATE_BERMUDA)
  if (error) {
    console.error(error)
    alert(
      "Oups ! Une erreur est survenue lors de l'enregistrement du bermuda, veuillez recommencer.",
      false
    )
  }

  const pickImage = async () => {
    if (!libraryStatus?.granted) {
      requestLibraryPermission()
    }

    if (libraryStatus?.granted) {
      let media = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.7,
        base64: true,
        videoMaxDuration: 30,
      })

      if (!media?.canceled) {
        if (media.assets[0].type === 'image') {
          setLocalVideo(null)
          setLocalImage(media.assets[0])
        }
        if (media.assets[0].type === 'video') {
          setLocalVideo(media.assets[0])
          setLocalImage(null)
        }
      }
    }
  }

  const CLOUDINARY_SERVICE_URL =
    Constants.expoConfig?.extra?.cloudinaryServiceUrl || ''

  const uploadToCloudinary = async (media: string, url: string) => {
    const body = new FormData()
    body.append('file', media)
    body.append('upload_preset', 'zwtluneg')
    body.append('cloud_name', 'du5fcvup4')

    try {
      let response = await fetch(url, {
        body,
        headers: {
          'content-type': 'multipart/form-data',
        },
        method: 'POST',
      })

      if (response.ok) {
        setLoading(false)
        const json = await response.json()
        const imageUrl = json.secure_url.replace(CLOUDINARY_SERVICE_URL, '')
        createBermuda({
          variables: {
            text,
            imageUrl,
          },
        })
        alert('Bermuda enregistré avec succès !', true)
      } else {
        setLoading(false)
        alert(
          "Oups ! Une erreur est survenue lors de l'enregistrement du bermuda, veuillez recommencer.",
          false
        )
        console.error('CLOUDINARY ERROR', response)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const mediaUpload = async () => {
    let base64
    let CLOUDINARY_URL

    setLoading(true)

    if (localImage) {
      CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/du5fcvup4/image/upload'

      if (!localImage?.base64) {
        let encodedImage = await FileSystem.readAsStringAsync(localImage?.uri, {
          encoding: 'base64',
        })
        base64 = `data:image/jpg;base64,${encodedImage}`
      }

      if (localImage?.base64) {
        base64 = `data:image/jpeg;base64,${localImage.base64}`
      }
    }

    if (localVideo) {
      CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/du5fcvup4/video/upload'

      let encodedVideo = await FileSystem.readAsStringAsync(localVideo?.uri, {
        encoding: 'base64',
      })
      base64 = `data:video/mp4;base64,${encodedVideo}`
    }

    base64 && CLOUDINARY_URL && uploadToCloudinary(base64, CLOUDINARY_URL)
  }

  const [keyboard, setKeyboard] = useState<boolean>(false)

  useEffect(() => {
    setLocalImage(null)
    setLocalVideo(null)

    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false)
    })
  }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            ...main.container,
            justifyContent:
              localImage || localVideo ? 'space-between' : 'center',
          }}
        >
          {loading && (
            <ActivityIndicator
              color={colors.highlight}
              size={'large'}
              animating={true}
              style={main.loading}
            />
          )}
          {keyboard === false && (
            <View style={main.topButtons}>
              <LargeButton
                text="SELECTIONNER UN BERMUDA"
                width="80%"
                backgroundColor={colors.primary}
                color={colors.background}
                fontFamily={fonts.default}
                onPress={pickImage}
              />
              <LargeButton
                text="PRENDRE UN BERMUDA"
                width="80%"
                backgroundColor={colors.primary}
                color={colors.background}
                fontFamily={fonts.default}
                onPress={() => navigation.navigate('Camera')}
              />
            </View>
          )}

          {(localImage || localVideo) && (
            <>
              <View style={main.mediaAndText}>
                <View
                  style={{
                    ...main.mediaContainer,
                    width: keyboard ? undefined : '100%',
                    flex: keyboard ? 1 : undefined,
                    margin: keyboard ? 30 : undefined,
                  }}
                >
                  {localImage && (
                    <Image
                      style={{
                        ...main.media,
                        backgroundColor: colors.background,
                      }}
                      source={{ uri: localImage?.uri }}
                      resizeMode="contain"
                    />
                  )}
                  {localVideo && (
                    <Video
                      style={{
                        ...main.media,
                        backgroundColor: colors.background,
                      }}
                      source={{ uri: localVideo.uri }}
                      useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                      isLooping
                    />
                  )}
                  <Frame
                    width="100%"
                    cornerLength={20}
                    cornerWidth={5}
                    color={colors.primary}
                  />
                </View>

                <View style={main.textContainer}>
                  <TextInput
                    style={{
                      ...main.textInput,
                      backgroundColor: colors.background,
                      color: colors.primary,
                    }}
                    value={text}
                    onChangeText={setText}
                    placeholder=" Commenter cette photo ..."
                    placeholderTextColor={colors.primary}
                    multiline={true}
                    maxLength={120}
                  />
                  <View
                    style={{
                      ...main.bottomLine,
                      backgroundColor: colors.highlight,
                    }}
                  />
                </View>
              </View>

              <LargeButton
                text="ENVOYER"
                width="80%"
                backgroundColor={colors.highlight}
                color={colors.card}
                fontFamily={fonts.default}
                onPress={mediaUpload}
              />
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default BermudasScreen

const main = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topButtons: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 25,
  },
  mediaAndText: {
    flex: 0.9,
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mediaContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  media: {
    position: 'absolute',
    width: '95%',
    aspectRatio: 1,
  },
  textContainer: {
    flex: 0.7,
    width: '100%',
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
  bottomLine: {
    height: 2,
    width: '100%',
  },
  loading: {
    position: 'absolute',
    zIndex: 20,
    top: '50%',
  },
})
