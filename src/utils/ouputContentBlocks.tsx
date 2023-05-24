import { Text } from 'react-native'
import { Title } from 'react-native-paper'
import parse from 'html-react-parser'
import { IContentBlock } from '../screens/BlogScreen'
import { TabasColorTheme } from '../interfaces'

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
        default:
          throw new Error('Header level must be specified')
      }
    case 'image':
      return <img key={index} src={block.data.url} alt={block.data.alt} />
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
          {parse(block.data.text || '')}
        </Text>
      )

    default:
      return null
  }
}

export default outputData
