import { Text, Image } from 'react-native'
import { Title } from 'react-native-paper'
import parse, { Element } from 'html-react-parser'
import Constants from 'expo-constants'

import { IContentBlock } from '../screens/BlogScreen'
import { TabasColorTheme } from '../interfaces'

const IMAGES_SERVICE_URL = Constants.expoConfig?.extra?.imagesServiceUrl || ''

const outputData = (
  index: number,
  colors: TabasColorTheme['colors'],
  fonts: TabasColorTheme['fonts'],
  block?: IContentBlock,
  summary: boolean = false
) => {
  if (!block) return null
  if (summary) {
    if (block.type !== 'paragraph') return null
    let trimmedContent = block.data.text?.substring(0, 200)
    trimmedContent = trimmedContent?.substring(
      0,
      Math.min(trimmedContent.length, trimmedContent.lastIndexOf(' '))
    )
    return (
      <Text key={index} style={{ color: colors.text, textAlign: 'justify' }}>
        {parse(trimmedContent || '')} {'[...]'}
      </Text>
    )
  }
  switch (block.type) {
    case 'header':
      switch (block.data.level) {
        case 1:
          return (
            <Title
              key={index}
              style={{
                color: colors.text,
                fontWeight: 'bold',
                fontFamily: fonts.title,
                fontSize: 30,
                lineHeight: 40,
              }}
            >
              {block.data.text}
            </Title>
          )
        case 2:
          return (
            <Title
              key={index}
              style={{
                color: colors.text,
                fontWeight: 'bold',
                fontSize: 25,
              }}
            >
              {block.data.text}
            </Title>
          )
        case 3:
          return (
            <Title
              key={index}
              style={{
                color: colors.text,
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              {block.data.text}
            </Title>
          )
        case 4:
          return (
            <Title key={index} style={{ color: colors.text, fontSize: 20 }}>
              {block.data.text}
            </Title>
          )
        case 5:
          return (
            <Title key={index} style={{ color: colors.text, fontSize: 20 }}>
              {block.data.text}
            </Title>
          )
        case 6:
          return (
            <Title key={index} style={{ color: colors.text, fontSize: 15 }}>
              {block.data.text}
            </Title>
          )
        default:
          throw new Error('Header level must be specified')
      }
    case 'image':
      const imageUrl = block.data.file?.url as string
      const uri = imageUrl.replace('http://localhost:8000', IMAGES_SERVICE_URL)
      return (
        <Image
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'cover',
            marginVertical: 5,
          }}
          key={index}
          source={{ uri }}
          alt={block.data.caption}
        />
      )
    case 'list':
      switch (block.data.style) {
        case 'unordered':
          return (
            <ul key={index} style={{ color: colors.text, textAlign: 'left' }}>
              {block.data.items?.map((element, liIndex) => {
                return <li key={`li-${index}${liIndex}`}>{parse(element)}</li>
              })}
            </ul>
          )
        case 'ordered':
          return (
            <ol key={index} style={{ color: colors.text, textAlign: 'left' }}>
              {block.data.items?.map((element, liIndex) => {
                return <li key={`li-${index}${liIndex}`}>{parse(element)}</li>
              })}
            </ol>
          )
        default:
          throw new Error('List block style must be specified')
      }

    case 'paragraph':
      return (
        <Text key={index} style={{ color: colors.text, textAlign: 'justify' }}>
          {parse(block.data.text || '', {
            replace: (domNode) => {
              if (domNode instanceof Element && domNode.name === 'br') {
                return <></>
              }
            },
          })}
        </Text>
      )

    default:
      return null
  }
}

export default outputData
