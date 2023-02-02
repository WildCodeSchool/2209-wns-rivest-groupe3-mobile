import { View, Text, Image, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import { DetailsScreenRouteProp } from '../navigation/types'

const BlogScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>()
  const { name } = route.params

  const blogProfileImg = 'https://images7.alphacoders.com/115/1153508.jpg'

  const articleImg = 'https://images7.alphacoders.com/115/1153508.jpg'

  return (
    <View style={styles.container}>
      <View style={styles.heroBannerContainer}>
        <Image style={styles.blogImg} source={{ uri: blogProfileImg }} />
        <Text style={styles.blogName}>{name}</Text>
      </View>
      <View style={styles.articleListContainer}>
        <Text>ArticleList Screen</Text>
        <Image style={styles.articleImg} source={{ uri: articleImg }}></Image>
        <Text style={styles.articleTitle}></Text>
        <Text style={styles.articleDescription}></Text>
      </View>
    </View>
  )
}

export default BlogScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
  },

  heroBannerContainer: {
    alignItems: 'center',
    flex: 0.3,
    backgroundColor: '#f8f8f2',
    paddingTop: 20,
  },

  blogImg: {
    flex: 0.5,
    width: 250,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  blogName: {
    flex: 0.5,
    color: '#282a36',
    fontSize: 30,
    fontWeight: 'bold',
    // paddingTop: 10,
  },

  articleListContainer: {
    flex: 1,
    backgroundColor: '#282a36',
  },

  articleImg: {
    flex: 1,
    width: 250,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  articleTitle: {
    flex: 1,
    color: '#f8f8f2',
    fontSize: 30,
    fontWeight: 'bold',
  },

  articleDescription: {
    flex: 1,
    color: '#f8f8f2',
    fontSize: 20,
  },


})
