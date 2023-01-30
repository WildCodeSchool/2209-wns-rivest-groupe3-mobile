import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { BlogScreenRouteProp } from '../navigation/types'

const BlogScreen = () => {
  const route = useRoute<BlogScreenRouteProp>()
  const { name } = route.params

  return (
    <View style={styles.container}>
      <Text>Blog : {name}</Text>
    </View>
  )
}

export default BlogScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
