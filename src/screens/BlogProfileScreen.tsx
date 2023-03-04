import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

const BlogProfileImg =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

const BlogProfile = () => {
  return (
    <View>
      <Image style={img.articleImg} source={{ uri: BlogProfileImg }}></Image>
      <Text>BlogProfile</Text>
    </View>
  )
}

export default BlogProfile

const img = StyleSheet.create({
  articleImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})
