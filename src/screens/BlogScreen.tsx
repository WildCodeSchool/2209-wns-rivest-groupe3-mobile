import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { useEffect, useRef } from 'react'
import { useRoute, useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import {
  HomeScreenNavigationProp,
  BlogScreenRouteProp,
} from '../navigation/types'
import { TabasColorTheme } from '../interfaces'
import Constants from 'expo-constants'
import { Title } from 'react-native-paper'
import { useQuery } from '@apollo/client'
import { GET_ONE_BLOG } from '../gql/blogs'
import { BlogDataType } from './HomeScreen'
import outputData from '../utils/ouputContentBlocks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const IMAGES_SERVICE_URL = Constants.expoConfig?.extra?.imagesServiceUrl || ''

export interface IArticleContent {
  version: number
  id: string
  current: boolean
  content: IContentType
}
export interface IContentType {
  time: number
  version: string
  blocks: IContentBlock[]
}
export interface IContentBlock {
  id: string
  type: string
  data: IContentBlockData
}
export interface IContentBlockData {
  text?: string
  level?: number
  style?: string
  items?: string[]
  caption?: string
  url?: string
  alt?: string
}

export type ArticleDataType = {
  id: string
  title: string
  slug: string
  blogId: string
  coverUrl: string
  createdAt: Date
  postedAt: Date
  show: boolean
  country: string
  version: number
  articleContent: IArticleContent[]
  blog?: BlogDataType
}

const FadeinArticleCard = ({
  item,
  index,
  blogSlug,
}: {
  item: ArticleDataType
  index: number
  blogSlug: string
}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const { colors, fonts } = useTheme() as TabasColorTheme
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: (index + 1) * 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View style={{ opacity: fadeAnim, marginBottom: 20 }}>
      <Pressable
        onPress={() =>
          navigation.navigate('Article', {
            slug: item.slug,
            blogSlug,
          })
        }
      >
        <View>
          <View>
            <Image
              style={herobanner.blogImg}
              source={
                item.coverUrl
                  ? { uri: IMAGES_SERVICE_URL + item.coverUrl }
                  : require('../assets/images/Tabasblog-default.png')
              }
            />
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Title
              style={{
                textAlign: 'center',
                color: colors.highlight,
                fontFamily: fonts.title,
                fontSize: 35,
                lineHeight: 40,
              }}
            >
              {item.title}
            </Title>
            <View>
              {outputData(
                index,
                colors,
                fonts,
                item.articleContent[0].content.blocks.find(
                  (block) => block.type === 'paragraph'
                ),
                true
              )}
            </View>
          </View>
        </View>
      </Pressable>
      <View
        style={{
          flex: 1,
          height: StyleSheet.hairlineWidth,
          backgroundColor: '#ffffff',
          marginTop: 20,
          marginHorizontal: 50,
        }}
      />
    </Animated.View>
  )
}

const BlogScreen = () => {
  const { colors, fonts } = useTheme() as TabasColorTheme
  const route = useRoute<BlogScreenRouteProp>()
  const { slug } = route.params
  const { data, error, loading, refetch } = useQuery(GET_ONE_BLOG, {
    variables: { slug },
    fetchPolicy: 'cache-and-network',
  })
  const insets = useSafeAreaInsets()

  if (loading)
    return (
      <View style={main.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  if (error) {
    console.error({ error })
    return null
  }
  const { getBlog: blog }: { getBlog: BlogDataType } = data

  return (
    <ScrollView
      style={main.container}
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
    >
      <View style={herobanner.container}>
        <Image
          style={herobanner.blogImg}
          source={
            blog.coverUrl
              ? { uri: IMAGES_SERVICE_URL + blog.coverUrl }
              : require('../assets/images/Tabasblog-default.png')
          }
        />
      </View>
      <View
        style={{
          ...herobanner.container,
          backgroundColor: colors.background,
          paddingVertical: Math.max(insets.top, 10),
        }}
      >
        <Text
          style={{
            flex: 1,
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.text,
            fontFamily: fonts.title,
            fontSize: 55,
            paddingHorizontal: 0,
          }}
        >
          {blog.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: colors.text,
            fontFamily: fonts.default,
            fontSize: 16,
            paddingBottom: -30,
          }}
        >
          de {blog.user.nickname}
        </Text>
      </View>

      <View>
        {blog.articles?.length ? (
          blog.articles?.map((item, index) => (
            <FadeinArticleCard
              item={item}
              index={index}
              key={item.id}
              blogSlug={blog.slug}
            />
          ))
        ) : (
          <Text
            style={{
              textAlign: 'center',
              color: colors.text,
              fontFamily: fonts.default,
              fontSize: 16,
              paddingBottom: -30,
            }}
          >
            Aucun article dans ce blog...
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

export default BlogScreen

const main = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const herobanner = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },

  blogImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
})
