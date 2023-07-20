import { useQuery } from '@apollo/client'
import Constants from 'expo-constants'
import { useTheme } from '@react-navigation/native'
import { useContext } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native'
import { IUser, IUserContext, UserContext } from '../contexts/UserContext'
import { GET_USER } from '../gql/user'
import { TabasColorTheme } from '../interfaces'
import Error from '../component/Error'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

const IMAGES_SERVICE_URL = Constants.expoConfig?.extra?.imagesServiceUrl || ''

const ProfileScreen = () => {
  const { user, setUser } = useContext<IUserContext>(UserContext)
  const { colors } = useTheme() as TabasColorTheme
  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser')
    await SecureStore.deleteItemAsync('token')
    setUser(null)
  }
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      getOneUserId: user?.id,
    },
  })
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return <Error error={error} />
  }

  const { getOneUser: userData }: { getOneUser: IUser } = data

  return (
    <ScrollView
      style={{ minHeight: '100%' }}
      refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
    >
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: userData.avatar
                ? IMAGES_SERVICE_URL + userData.avatar
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            }}
            style={styles.avatar}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.text,
              alignSelf: 'center',
              fontSize: 22,
            }}
          >
            {userData.nickname}
          </Text>
        </View>
        <View
          style={{ ...styles.detailsContainer, borderTopColor: colors.border }}
        >
          <View style={styles.detailLine}>
            <Text style={{ ...styles.detailHeader, color: colors.text }}>
              Prénom
            </Text>
            <View
              style={{
                ...styles.detailData,
                borderBottomWidth: 1,
                borderBottomColor: colors.highlight,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  opacity: userData.firstName ? 1 : 0.2,
                }}
              >
                {userData.firstName ? userData.firstName : 'Prénom'}
              </Text>
            </View>
          </View>
          <View style={styles.detailLine}>
            <Text style={{ ...styles.detailHeader, color: colors.text }}>
              Nom
            </Text>
            <View
              style={{
                ...styles.detailData,
                borderBottomWidth: 1,
                borderBottomColor: colors.highlight,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  opacity: userData.lastName ? 1 : 0.2,
                }}
              >
                {userData.lastName ? userData.lastName : 'Nom'}
              </Text>
            </View>
          </View>
          <View style={styles.detailLine}>
            <Text style={{ ...styles.detailHeader, color: colors.text }}>
              City
            </Text>
            <View
              style={{
                ...styles.detailData,
                borderBottomWidth: 1,
                borderBottomColor: colors.highlight,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  opacity: userData.city ? 1 : 0.2,
                }}
              >
                {userData.city ? userData.city : 'City'}
              </Text>
            </View>
          </View>
          <View style={styles.detailLine}>
            <Text style={{ ...styles.detailHeader, color: colors.text }}>
              Présentation
            </Text>
            <View
              style={{
                ...styles.detailData,
                borderBottomWidth: 1,
                borderBottomColor: colors.highlight,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  opacity: userData.description ? 1 : 0.2,
                }}
              >
                {userData.description ? userData.description : 'Présentation'}
              </Text>
            </View>
          </View>
          <View style={styles.detailLine}>
            <Text style={{ ...styles.detailHeader, color: colors.text }}>
              Email
            </Text>
            <View
              style={{
                ...styles.detailData,
                borderBottomWidth: 1,
                borderBottomColor: colors.highlight,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  opacity: userData.email ? 1 : 0.2,
                }}
              >
                {userData.email ? userData.email : 'Email'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <Pressable
          onPress={logout}
          style={{
            backgroundColor: colors.notification,
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 6,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            DÉCONNEXION
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  detailsContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    width: '100%',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  detailLine: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailHeader: {
    width: 100,
  },
  detailData: {
    flex: 1,
    width: '100%',
    paddingBottom: 15,
  },
})
