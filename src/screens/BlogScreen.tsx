import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native'
import { Title } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import { BlogScreenRouteProp } from '../navigation/types'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../navigation/types'

export type ArticleDataType = {
  id: number
  name: string
  img: string
  description: string
}

const blogProfileImg =
  'https://mobimg.b-cdn.net/v3/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg?h=900&r=0.5'

const articleImg = 'https://images7.alphacoders.com/115/1153508.jpg'

const articleDataList: ArticleDataType[] = [
  {
    id: 1,
    name: 'article-1',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
  },
  {
    id: 2,
    name: 'article-2',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
  },
  {
    id: 3,
    name: 'article-3',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
  },
  {
    id: 4,
    name: 'article-4',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisi',
  },
  {
    id: 5,
    name: 'article-5',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
  },
]

const BlogScreen = () => {
  const route = useRoute<BlogScreenRouteProp>()
  const { name } = route.params
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const renderListItems = ({ item }: { item: ArticleDataType }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Article', {
            name: item.name,
          })
        }
      >
        <View style={article.container}>
          <View style={article.imgContainer}>
            <Image style={article.img} source={{ uri: articleImg }}></Image>
          </View>
          <View style={article.contentContainer}>
            <Text style={article.title}>{item.name}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={main.container}>
      <Pressable
        onPress={() =>
          navigation.navigate('Blogger', {
            name: name,
          })
        }
      >
        <View style={herobanner.container}>
          <Image style={herobanner.blogImg} source={{ uri: blogProfileImg }} />
          <Text style={herobanner.blogName}>{name}</Text>
        </View>
      </Pressable>
      <View style={article.listContainer}>
        <FlatList
          nestedScrollEnabled
          data={articleDataList}
          renderItem={renderListItems}
        />
      </View>
    </View>
  )
}

export default BlogScreen

const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
  },
})

const herobanner = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#282a36',
    position: 'relative',
  },

  blogImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  blogName: {
    color: '#f8f8f2',
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 10,
    // paddingTop: 10,
    position: 'absolute',
  },
})

const article = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  listContainer: {
    flex: 1,
    borderRadius: 10,
    paddingTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  imgContainer: {
    backgroundColor: '#f8f8f2',
    borderRadius: 10,
    // overflow: 'hidden',
  },

  img: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  contentContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f8f2',
    borderRadius: 10,
    padding: 10,
  },

  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },

  // description: {
  //   flex: 1,
  //   color: 'black',
  //   fontSize: 20,
  // },
})
