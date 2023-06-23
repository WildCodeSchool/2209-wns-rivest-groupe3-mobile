import { useState, useContext, useRef } from 'react'
import { useTheme } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

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
      aspect: [1, 1],
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

  // const data = new FormData();
  //   data.append('fileData, {
  //     uri: image,
  //     type: 'image/jpeg',
  //     name: 'blabla,
  //   });

  // let base64Img = data:image/jpg;base64,${pickerResult.base64};

  // JSON.stringify()

  // await singleFileUploader({
  //   distantUrl:
  //     "https://wildstagram.nausicaa.wilders.dev/upload",
  //   expectedStatusCode: 201,
  //   filename: image.item,
  //   filetype: "image/jpeg",
  //   formDataName: "fileData",
  //   localUri:
  //     FileSystem.cacheDirectory +
  //     "ImageManipulator/" +
  //     image.item,
  //   token: Constants.manifest.extra.token,
  // });

  return (
    <View style={main.container}>
      <TouchableOpacity onPress={pickImage}>
        <Text>Sélectionner un bermuda dans la galerie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Text>Prendre un bermuda</Text>
      </TouchableOpacity>

      {localImage && (
        <Image style={main.media} source={{ uri: localImage?.uri }} />
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
  media: {
    flex: 0.5,
    width: '80%',
    margin: 20,
  },
})
