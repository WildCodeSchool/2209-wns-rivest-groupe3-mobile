import { View, Text, Image, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { DetailsScreenRouteProp } from '../navigation/types'

const BlogScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>()
  const { name } = route.params

  const blogProfileImg =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

  return (
    <View style={styles.container}>
      <View style={styles.blogImgContainer}>
        <Image
          style={styles.blogImg}
          source={{ uri: blogProfileImg }}
        />
      </View>
      <View style={styles.blogNameContainer}>
        <Text>Blog : {name}</Text>
      </View>
    </View>
  )
}

export default BlogScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#44475a',
  },

  blogNameContainer: {
    flex: 1,
  },

  blogImgContainer: {
    flex: 1,
  },

  blogImg: {
    flex: 1,
    width: 40,
    height: 600,
  },

})
