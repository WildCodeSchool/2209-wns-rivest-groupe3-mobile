import { useTheme } from '@react-navigation/native'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  ActivityIndicator,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native'
import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'
import Error from '../component/Error'
import { TabasColorTheme } from '../interfaces'
import LargeButton from '../component/LargeButton'
import { useContext, useEffect, useRef, useState } from 'react'
import { IUser, IUserContext, UserContext } from '../contexts/UserContext'
import { GET_ALL_BERMUDAS } from '../gql/bermudas'
import { Title } from 'react-native-paper'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { ResizeMode, Video } from 'expo-av'

const IMAGES_SERVICE_URL = Constants.expoConfig?.extra?.imagesServiceUrl || ''
const CLOUDINARY_SERVICE_URL =
  Constants.expoConfig?.extra?.cloudinaryServiceUrl || ''

type BermudaUser = {
  avatar: string
  nickname: string
}

type BermudaType = {
  id: string
  imageUrl: string
  text: string
  createdAt: Date
  user: BermudaUser
}

const FadeInBermudaCard = ({
  item: { item, index },
}: {
  item: ListRenderItemInfo<BermudaType>
}) => {
  const { colors, fonts } = useTheme() as TabasColorTheme
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [status, setStatus] = useState({ isPlaying: false })
  const { height, width } = Dimensions.get('window')

  const checkType = (url: string) => {
    return url.split('/')[0]
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: (index + 1) * 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.cardContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: item.user.avatar
                ? IMAGES_SERVICE_URL + item.user.avatar
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            }}
            style={styles.avatar}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.text,
              alignSelf: 'center',
            }}
          >
            {item.user.nickname}
          </Text>
        </View>
        {checkType(item.imageUrl) === 'video' && (
          <View
            style={{
              width,
              height: height / 1.3,
              backgroundColor: colors.background,
            }}
          >
            <Video
              style={{
                width: 'auto',
                height: '100%',
                backgroundColor: colors.background,
              }}
              source={{ uri: CLOUDINARY_SERVICE_URL + item.imageUrl }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          </View>
        )}
        {checkType(item.imageUrl) === 'image' && (
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={
                item.imageUrl
                  ? { uri: CLOUDINARY_SERVICE_URL + item.imageUrl }
                  : require('../assets/images/Tabasblog-default.png')
              }
            />
          </View>
        )}

        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 0,
            backgroundColor: colors.primary,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.highlight,
              alignSelf: 'flex-start',
              padding: 10,
            }}
          >
            {item.text}
          </Text>
        </View>
      </View>
    </Animated.View>
  )
}

const BermudasListScreen = ({ navigation }: { navigation: any }) => {
  const { colors, fonts } = useTheme() as TabasColorTheme
  const { user, setUser } = useContext<IUserContext>(UserContext)

  const { data, error, loading, refetch } = useQuery(GET_ALL_BERMUDAS, {
    fetchPolicy: 'cache-and-network',
  })
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  if (error) {
    return <Error error={error} />
  }
  const { getAllBermudas: bermudas } = data

  if (bermudas.length < 1) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Title
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: colors.text,
              fontFamily: fonts.title,
              fontSize: 40,
              lineHeight: 40,
            }}
          >
            Tabas.blog
          </Title>
        </View>

        <ScrollView
          contentContainerStyle={{
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 7,
          }}
        >
          <Title
            style={{
              ...styles.cardTitle,
              color: colors.highlight,
              fontFamily: fonts.title,
            }}
          >
            Aucun bermuda trouvé...
          </Title>
          {user && (
            <LargeButton
              text="NOUVEAU BERMUDA"
              width="80%"
              backgroundColor={colors.primary}
              color={colors.background}
              fontFamily={fonts.default}
              onPress={() => navigation.navigate('CreateBermuda')}
            />
          )}
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Title
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.text,
            fontFamily: fonts.title,
            fontSize: 40,
            lineHeight: 40,
          }}
        >
          Tabas.blog
        </Title>
      </View>
      <View style={styles.listContainer}>
        <FlashList
          data={bermudas}
          refreshing={false}
          estimatedItemSize={10}
          onRefresh={async () => {
            await refetch()
          }}
          renderItem={(item: ListRenderItemInfo<BermudaType>) => {
            return <FadeInBermudaCard item={item} />
          }}
        />
      </View>
      {user && (
        <LargeButton
          text="NOUVEAU BERMUDA"
          width="80%"
          backgroundColor={colors.primary}
          color={colors.background}
          fontFamily={fonts.default}
          onPress={() => navigation.navigate('CreateBermuda')}
        />
      )}
    </View>
  )
}

export default BermudasListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  listContainer: {
    width: '100%',
    flex: 7,
  },

  cardContainer: {
    marginBottom: 30,
  },

  bodyContainer: {
    padding: 20,
    borderRadius: 10,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingStart: 15,
    marginBottom: 5,
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  cardDescription: {
    marginTop: 10,
  },

  imgContainer: {
    position: 'relative',
  },
})
