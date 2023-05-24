import type { Theme } from '@react-navigation/native'

export type TabasColorTheme = {
  colors: {
    highlight: string
  }
  fonts: {
    title: string
    default: string
  }
} & Theme
