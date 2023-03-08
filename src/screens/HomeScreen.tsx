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
import { IMAGES_SERVICE_URL } from '@env'
import { HomeScreenNavigationProp } from '../navigation/types'
import { TabasColorTheme } from '../interfaces'
import { GET_ALL_BLOGS_FOR_DISCOVER } from '../gql/blogs'

export type BlogDataType = {
  id: number
  name: string
  slug: string
  coverUrl?: string
  description?: string
  tag?: string[]
  commentNumber?: number
}

const FadeinCard = ({
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
            name: item.name,
          })
        }
      >
        <View style={styles.cardContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={
                item.coverUrl
                  ? { uri: IMAGES_SERVICE_URL + item.coverUrl }
                  : require('../assets/images/Tabasblog-default.png')
              }
              style={styles.image}
            />
            <Text style={styles.commentNumber}>{item.commentNumber}</Text>
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
  const { data, error, loading, refetch } = useQuery(GET_ALL_BLOGS_FOR_DISCOVER)
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
            ...styles.BlogListContainer,
            justifyContent: 'center',
            alignItems: 'center',
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
      <View style={styles.BlogListContainer}>
        <FlashList
          data={blogs}
          refreshing={false}
          estimatedItemSize={300}
          onRefresh={async () => {
            await refetch()
          }}
          renderItem={(item: ListRenderItemInfo<BlogDataType>) => {
            return <FadeinCard item={item} />
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
    flex: 1,
    paddingTop: 50,
  },

  cardContainer: {
    paddingTop: 20,
  },

  imgContainer: {
    position: 'relative',
  },

  bodyContainer: {
    padding: 20,
    borderRadius: 10,
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
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
