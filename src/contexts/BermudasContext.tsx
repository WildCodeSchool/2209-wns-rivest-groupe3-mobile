import { createContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

interface ILocalVideo {
  uri: string
  width?: number
  height?: number
}

interface IContext {
  localImage: ImagePicker.ImagePickerAsset | null
  setLocalImage: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset | null>
  >
  localVideo: ILocalVideo | null
  setLocalVideo: React.Dispatch<React.SetStateAction<ILocalVideo | null>>
}

export const BermudasContext = createContext<IContext>({
  localImage: null,
  setLocalImage: () => {},
  localVideo: null,
  setLocalVideo: () => {},
})

export const BermudasContextProvider = ({
  children,
}: {
  children: JSX.Element
}) => {
  const [localImage, setLocalImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null)
  const [localVideo, setLocalVideo] = useState<ILocalVideo | null>(null)

  return (
    <BermudasContext.Provider
      value={{
        localImage,
        setLocalImage,
        localVideo,
        setLocalVideo,
      }}
    >
      {children}
    </BermudasContext.Provider>
  )
}
