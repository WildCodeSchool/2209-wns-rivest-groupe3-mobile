import { useRoute, useTheme } from '@react-navigation/native'
import React from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { Title } from 'react-native-paper'
import { TabasColorTheme } from '../interfaces'
import { ArticleScreenRouteProp } from '../navigation/types'
import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'
import { GET_ONE_ARTICLE } from '../gql/articles'
import outputData from '../utils/ouputContentBlocks'
import { ArticleDataType } from './BlogScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Error from '../component/Error'

const IMAGES_SERVICE_URL = Constants.expoConfig?.extra?.imagesServiceUrl || ''

const ArticleScreen = () => {
  const { colors, fonts } = useTheme() as TabasColorTheme
  const route = useRoute<ArticleScreenRouteProp>()
  const insets = useSafeAreaInsets()
  const { slug, blogSlug } = route.params
  const { data, error, loading, refetch } = useQuery(GET_ONE_ARTICLE, {
    variables: { slug, blogSlug },
    fetchPolicy: 'cache-and-network',
  })

  if (loading)
    return (
      <View style={main.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  if (error) {
    return <Error error={error} />
  }
  const { getOneArticle: article }: { getOneArticle: ArticleDataType } = data

  return (
    <ScrollView
      style={main.container}
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
    >
      <View style={herobanner.container}>
        <Image
          style={herobanner.articleImg}
          source={
            article.coverUrl
              ? { uri: IMAGES_SERVICE_URL + article.coverUrl }
              : require('../assets/images/Tabasblog-default.png')
          }
        />
      </View>
      <View
        style={{
          ...herobanner.container,
          backgroundColor: colors.background,
          paddingVertical: Math.max(insets.top, 10),
        }}
      >
        <Title
          style={{
            textAlign: 'center',
            color: colors.highlight,
            fontFamily: fonts.title,
            fontSize: 35,
            lineHeight: 40,
          }}
        >
          {article.title}
        </Title>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        {article.articleContent[0].content.blocks.map((block, index) =>
          outputData(index, colors, fonts, block)
        )}
      </View>
    </ScrollView>
  )
}

export default ArticleScreen

const main = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const herobanner = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },

  articleImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
})
