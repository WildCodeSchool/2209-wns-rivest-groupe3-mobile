import { useState, useContext, useRef, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Video, ResizeMode } from 'expo-av'

import { TabasColorTheme } from '../interfaces'
import { BermudasContext } from '../contexts/BermudasContext'

const BermudasScreen = ({ navigation }: any) => {
  const { colors, fonts } = useTheme() as TabasColorTheme

  const { localImage, setLocalImage, localVideo, setLocalVideo } =
    useContext(BermudasContext)

  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null)

  const [libraryStatus, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions()

  const pickImage = async () => {
    if (!libraryStatus?.granted) {
      requestLibraryPermission()
    }

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
        const json = await response.json()
        setCloudinaryUrl(json.secure_url)
      } else {
        console.log('CLOUDINARY ERROR', response)
      }
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  const mediaUpload = async () => {
    let base64
    let CLOUDINARY_URL

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

  return (
    <View style={main.container}>
      <TouchableOpacity onPress={pickImage}>
        <Text>Sélectionner un bermuda dans la galerie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Text>Prendre un bermuda</Text>
      </TouchableOpacity>

      <View style={main.mediaContainer}>
        {localImage && (
          <Image
            style={main.media}
            source={{ uri: localImage?.uri }}
            resizeMode="contain"
          />
        )}
        {localVideo && (
          <Video
            style={main.media}
            source={{ uri: localVideo.uri }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        )}

        <TouchableOpacity onPress={mediaUpload}>
          <Text>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BermudasScreen

const main = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaContainer: {
    flex: 0.6,
    width: '80%',
    marginVertical: 30,
  },
  media: {
    height: '100%',
  },
})
