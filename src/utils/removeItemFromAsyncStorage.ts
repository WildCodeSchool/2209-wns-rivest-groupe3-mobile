import AsyncStorage from '@react-native-async-storage/async-storage'

const removeItemFromStorage = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (exception) {
    return false
  }
}

export default removeItemFromStorage
