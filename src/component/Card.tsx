import { View, Image, StyleSheet, Text } from 'react-native'
import { Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../navigation/types'
import { BlogDataType } from '../screens/HomeScreen'

const cardImg =
  'https://voyage-onirique.com/wp-content/uploads/2020/03/backiee-136872-landscape-1120x630.jpg'

const BlogDataList: BlogDataType[] = [
  {
    id: 1,
    name: 'blog1',
    title: 'Voyage en Thaïlande !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Thaïlande', '#Voyage', '#Asie'],
    commentNumber: 6,
  },
  {
    id: 2,
    name: 'blog2',
    title: 'Voyage en Inde !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Inde', '#Voyage', '#Asie'],
    commentNumber: 8,
  },
  {
    id: 3,
    name: 'blog3',
    title: 'Voyage en Irlande !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Irlande', '#Voyage', '#Europe'],
    commentNumber: 3,
  },
  {
    id: 4,
    name: 'blog4',
    title: 'Voyage au Mexique !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Mexique', '#Voyage', '#Amérique Centrale'],
    commentNumber: 5,
  },
  {
    id: 5,
    name: 'blog5',
    title: 'Voyage au Maroc !',
    img: 'https://placeimg.com/400/225/arch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquet mauris, nec lacinia nunc nisl eget nunc. Sed tincidunt, nisl',
    tag: ['#Maroc', '#Voyage', '#Afrique'],
    commentNumber: 12,
  },
]

const Card = () => {
  // const [fontsLoaded] = useFonts({
  //   'Lobster-Regular': require('../assets/fonts/Lobster-Regular.ttf'),
  //   'RobotoCondensed-Regular': require('../assets/fonts/RobotoCondensed-Regular.ttf'),
  // })

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync()
  //   }
  // }, [fontsLoaded])

  // if (!fontsLoaded) {
  //   return null
  // }

  const navigation = useNavigation<HomeScreenNavigationProp>()

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: cardImg }} style={styles.image} />
        <Text style={styles.commentNumber}>
          {BlogDataList[0].commentNumber}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Title style={styles.cardTitle}>{BlogDataList[0].title}</Title>
        <View style={styles.tagList}>
          <Text style={styles.tag}>{BlogDataList[0].tag[0]}</Text>
          <Text style={styles.tag}>{BlogDataList[0].tag[1]}</Text>
          <Text style={styles.tag}>{BlogDataList[0].tag[2]}</Text>
        </View>
        <Text style={styles.cardDescription}>
          {BlogDataList[0].description}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  cardContainer: {
    backgroundColor: '#282a36',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },

  imgContainer: {
    position: 'relative',
  },

  bodyContainer: {
    backgroundColor: 'white',
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
  },

  tag: {
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
    marginTop: 10,
  },
})

export default Card