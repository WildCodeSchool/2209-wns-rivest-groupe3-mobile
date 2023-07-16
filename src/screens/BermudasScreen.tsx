import { useState, useContext, useRef, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { Video, ResizeMode } from 'expo-av'

import { TabasColorTheme } from '../interfaces'
import { BermudasContext } from '../contexts/BermudasContext'
import Frame from '../component/Frame'
import LargeButton from '../component/LargeButton'

const BermudasScreen = ({ navigation }: any) => {
  const { colors, fonts } = useTheme() as TabasColorTheme

  const { localImage, setLocalImage, localVideo, setLocalVideo } =
    useContext(BermudasContext)

  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [libraryStatus, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions()

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

  const uploadToCloudinary = async (media: string, url: string) => {
    const data = new FormData()
    data.append('file', media)
    data.append('upload_preset', 'zwtluneg')
    data.append('cloud_name', 'du5fcvup4')

    try {
      let response = await fetch(url, {
        body: data,
        headers: {
          'content-type': 'multipart/form-data',
        },
        method: 'POST',
      })

      if (response.ok) {
        setLoading(false)
        const json = await response.json()
        setCloudinaryUrl(json.secure_url)
        alert('Bermuda enregistré avec succès !', true)
        console.log(cloudinaryUrl)
      } else {
        setLoading(false)
        alert(
          "Une erreur est survenue lors de l'enregistrement du bermuda, veuillez recommencer.",
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

  useEffect(() => {
    setLocalImage(null)
    setLocalVideo(null)
    setCloudinaryUrl(null)
  }, [])

  return (
    <View
      style={{
        ...main.container,
        justifyContent: localImage || localVideo ? 'space-between' : 'center',
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

      {(localImage || localVideo) && (
        <>
          <View style={main.mediaContainer}>
            <Frame
              width="100%"
              height="100%"
              cornerLength={20}
              cornerWidth={5}
              color={colors.primary}
            />
            {localImage && (
              <Image
                style={{ ...main.media, backgroundColor: colors.background }}
                source={{ uri: localImage?.uri }}
                resizeMode="contain"
              />
            )}
            {localVideo && (
              <Video
                style={{ ...main.media, backgroundColor: colors.background }}
                source={{ uri: localVideo.uri }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            )}
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
  mediaContainer: {
    flex: 0.9,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  media: {
    position: 'absolute',
    zIndex: 10,
    width: '95%',
    height: '95%',
  },
  loading: {
    position: 'absolute',
    zIndex: 20,
    top: '50%',
  },
})
