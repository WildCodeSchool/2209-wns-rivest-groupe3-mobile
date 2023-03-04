import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  Animated,
} from 'react-native'
import { Title } from 'react-native-paper'
import { useNavigation, useTheme } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../navigation/types'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { TabasColorTheme } from '../interfaces'
import { useEffect, useRef } from 'react'

export type BlogDataType = {
  id: number
  name: string
  title: string
  img: string
  description: string
  tag: string[]
  commentNumber: number
}

const BlogDataList: BlogDataType[] = [
  {
    id: 1,
    name: 'blog-1',
    title: 'Voyage en Thaïlande !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Thaïlande', '#Voyage', '#Asie'],
    commentNumber: 6,
  },
  {
    id: 2,
    name: 'blog-2',
    title: 'Voyage en Inde !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Inde', '#Voyage', '#Asie'],
    commentNumber: 8,
  },
  {
    id: 3,
    name: 'blog-3',
    title: 'Voyage en Irlande !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Irlande', '#Voyage', '#Europe'],
    commentNumber: 3,
  },
  {
    id: 4,
    name: 'blog-4',
    title: 'Voyage au Mexique !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Mexique', '#Voyage', '#Amérique Centrale'],
    commentNumber: 5,
  },
  {
    id: 5,
    name: 'blog-5',
    title: 'Voyage au Maroc !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Maroc', '#Voyage', '#Afrique'],
    commentNumber: 12,
  },
]

const FadeinCard = ({
  item: { item, index },
}: {
  item: ListRenderItemInfo<BlogDataType>
}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const { colors } = useTheme() as TabasColorTheme
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
            <Image source={{ uri: item.img }} style={styles.image} />
            <Text style={styles.commentNumber}>{item.commentNumber}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Title style={{ ...styles.cardTitle, color: colors.highlight }}>
              {item.title}
            </Title>
            <View style={styles.tagList}>
              <Text style={styles.tag}>{item.tag[0]}</Text>
              <Text style={styles.tag}>{item.tag[1]}</Text>
              <Text style={styles.tag}>{item.tag[2]}</Text>
            </View>
            <Text style={{ ...styles.cardDescription, color: colors.text }}>
              {item.description}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}

const HomeScreen = () => {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.BlogListContainer}>
        <FlashList
          data={BlogDataList}
          refreshing={false}
          estimatedItemSize={300}
          renderItem={(item) => {
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
    paddingLeft: 20,
    paddingRight: 20,
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
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  commentNumber: {
    position: 'absolute',
    backgroundColor: 'rgba(98, 114, 164, 0.5)',
    textOpacity: 1,
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
    fontSize: 20,
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
