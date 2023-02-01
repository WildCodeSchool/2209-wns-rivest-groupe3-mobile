import { StyleSheet, View, Text, Pressable, Image, FlatList, ImageBackground } from 'react-native'
import { Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../navigation/types'
import Card from '../component/Card'

export type BlogDataType = {
  id: number
  name: string
  title: string
  img: string
  description: string
  theme: string[]
  commentNumber: number
}

const BlogDataList: BlogDataType[] = [
  {
    id: 1,
    name: 'blog1',
    title: 'Voyage en Thaïlande !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    theme: ['#Thaïlande', '#Voyage', '#Asie'],
    commentNumber: 6,
  },
  {
    id: 2,
    name: 'blog2',
    title: 'Voyage en Inde !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    theme: ['#Inde', '#Voyage', '#Asie'],
    commentNumber: 8,
  },
  {
    id: 3,
    name: 'blog3',
    title: 'Voyage en Irlande !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    theme: ['#Irlande', '#Voyage', '#Europe'],
    commentNumber: 3,
  },
  {
    id: 4,
    name: 'blog4',
    title: 'Voyage au Mexique !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    theme: ['#Mexique', '#Voyage', '#Amérique Centrale'],
    commentNumber: 5,
  },
  {
    id: 5,
    name: 'blog5',
    title: 'Voyage au Maroc !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    theme: ['#Maroc', '#Voyage', '#Afrique'],
    commentNumber: 12,
  },
]

const heroBannerImg =
  'https://images3.alphacoders.com/108/thumbbig-1082567.webp'
const cardImg =
  'https://voyage-onirique.com/wp-content/uploads/2020/03/backiee-136872-landscape-1120x630.jpg'

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const renderListItems = ({ item }: { item: BlogDataType }) => {
    return (
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
              source={{ uri: cardImg }}
              style={styles.image}
            />
            <Text style={styles.commentNumber}>{item.commentNumber}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Title style={styles.cardTitle}>{item.title}</Title>
            <View style={styles.themeList}>
              <Text style={styles.theme}>{item.theme[0]}</Text>
              <Text style={styles.theme}>{item.theme[1]}</Text>
              <Text style={styles.theme}>{item.theme[2]}</Text>
            </View>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.homeContainer}>
      <View style={styles.heroBannerContainer}>
        <ImageBackground
          style={styles.heroBannerImg}
          source={{ uri: heroBannerImg }}
        >
          <View style={styles.heroBannerTitleContainer}>
            <Text style={styles.heroBannerTitle}>Blogs</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.BlogListContainer}>
        {/* <FlatList
          nestedScrollEnabled
          data={BlogDataList}
          renderItem={renderListItems}
        /> */}
        <Card />

      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#44475a',
  },

  // HeroBanner

  heroBannerContainer: {
    display: 'flex',
    flex: 0.2,
    backgroundColor: '#44475a',
    width: '100%',
    paddingBottom: 15,
  },

  heroBannerImg: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },

  heroBannerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  heroBannerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  // BlogList

  BlogListContainer: {
    flex: 1,
    backgroundColor: '#44475a',
  },

  cardContainer: {
    backgroundColor: '#44475a',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },

  imgContainer: {
    position: 'relative',
    flex: 0.4,
  },

  bodyContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },

  commentNumber: {
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
  },

  themeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  theme: {
    fontFamily: 'Roboto',
    backgroundColor: 'rgba(98, 114, 164, 0.5)',
    color: 'white',
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  cardDescription: {
    fontFamily: 'Roboto',
    marginTop: 10,
  },
})

