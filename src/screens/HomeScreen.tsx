import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native'
import { useEffect, useRef } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { Title } from 'react-native-paper'
import Constants from 'expo-constants'
import { HomeScreenNavigationProp } from '../navigation/types'
import { TabasColorTheme } from '../interfaces'
import { GET_ALL_BLOGS_FOR_DISCOVER } from '../gql/blogs'
import { ArticleDataType } from './BlogScreen'

const IMAGES_SERVICE_URL = Constants.expoConfig?.extra?.imagesServiceUrl || ''

export type BlogDataType = {
  id: number
  name: string
  slug: string
  coverUrl?: string
  description?: string
  tag?: string[]
  commentNumber?: number
  user: {
    nickname: string
    avatar: string
  }
  articles?: ArticleDataType[]
}

const FadeinBlogCard = ({
  item: { item, index },
}: {
  item: ListRenderItemInfo<BlogDataType>
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
    <Animated.View style={{ opacity: fadeAnim }}>
      <Pressable
        onPress={() =>
          navigation.navigate('Blog', {
            slug: item.slug,
          })
        }
      >
        <View style={styles.cardContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: item.user.avatar
                  ? IMAGES_SERVICE_URL + item.user.avatar
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
              }}
              style={styles.avatar}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.text,
                alignSelf: 'center',
              }}
            >
              {item.user.nickname}
            </Text>
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={
                item.coverUrl
                  ? { uri: IMAGES_SERVICE_URL + item.coverUrl }
                  : require('../assets/images/Tabasblog-default.png')
              }
              style={styles.image}
            />
            {item.commentNumber && (
              <Text style={styles.commentNumber}>{item.commentNumber}</Text>
            )}
          </View>
          <View style={styles.bodyContainer}>
            <Title
              style={{
                ...styles.cardTitle,
                color: colors.highlight,
                fontFamily: fonts.title,
              }}
            >
              {item.name}
            </Title>
            {item.tag && (
              <View style={styles.tagList}>
                <Text style={styles.tag}>{item.tag[0]}</Text>
                <Text style={styles.tag}>{item.tag[1]}</Text>
                <Text style={styles.tag}>{item.tag[2]}</Text>
              </View>
            )}
            <Text
              style={{
                ...styles.cardDescription,
                color: colors.text,
                fontFamily: fonts.default,
              }}
            >
              {item.description}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}

const HomeScreen = () => {
  const { data, error, loading, refetch } = useQuery(
    GET_ALL_BLOGS_FOR_DISCOVER,
    { fetchPolicy: 'cache-and-network' }
  )
  const { colors, fonts } = useTheme() as TabasColorTheme
  if (loading)
    return (
      <View style={styles.homeContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  if (error) {
    console.error({ error })
    return null
  }
  const { getAllBlogs: blogs } = data

  if (blogs.length < 1) {
    return (
      <View style={styles.homeContainer}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Title
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: colors.text,
              fontFamily: fonts.title,
              fontSize: 40,
              lineHeight: 40,
            }}
          >
            Tabas.blog
          </Title>
        </View>
        <View
          style={{
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 7,
          }}
        >
          <Title
            style={{
              ...styles.cardTitle,
              color: colors.highlight,
              fontFamily: fonts.title,
            }}
          >
            Aucun blog trouvé...
          </Title>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.homeContainer}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Title
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.text,
            fontFamily: fonts.title,
            fontSize: 40,
            lineHeight: 40,
          }}
        >
          Tabas.blog
        </Title>
      </View>
      <View style={styles.BlogListContainer}>
        <FlashList
          data={blogs}
          refreshing={false}
          estimatedItemSize={10}
          onRefresh={async () => {
            await refetch()
          }}
          renderItem={(item: ListRenderItemInfo<BlogDataType>) => {
            return <FadeinBlogCard item={item} />
          }}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },

  // BlogList
  BlogListContainer: {
    flex: 7,
  },

  cardContainer: {
    marginBottom: 30,
  },

  imgContainer: {
    position: 'relative',
  },

  bodyContainer: {
    padding: 20,
    borderRadius: 10,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingStart: 15,
    marginBottom: 15,
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  commentNumber: {
    position: 'absolute',
    backgroundColor: 'rgba(98, 114, 164, 0.5)',
    bottom: 0,
    right: 0,
    color: 'white',
    paddingBottom: 8,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 8,
    borderRadius: 10,
  },

  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 5,
  },

  tag: {
    backgroundColor: 'rgba(98, 114, 164, 0.5)',
    color: 'white',
    borderRadius: 10,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  cardDescription: {
    marginTop: 10,
  },
})
