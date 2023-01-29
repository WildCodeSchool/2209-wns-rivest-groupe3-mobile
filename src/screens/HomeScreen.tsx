import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../navigation/types'

type itemType = {
  id: number
  name: string
}

const BlogData: itemType[] = [
  {
    id: 1,
    name: 'blog1',
  },
  {
    id: 2,
    name: 'blog2',
  },
  {
    id: 3,
    name: 'blog3',
  },
  {
    id: 4,
    name: 'blog4',
  },
  {
    id: 5,
    name: 'blog5',
  },
]

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const renderListItems = ({ item }: { item: itemType }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Blog', {
            name: item.name,
          })
        }
      >
        <Text> {item.name} </Text>
        <View style={styles.separator} />
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={BlogData} renderItem={renderListItems} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
  },
  separator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
})
