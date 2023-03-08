import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface IUser {
  id?: string
  nickname: string
  email: string
  lastName: string
  firstName: string
  lastLogin: Date
  description: string
  city: string
  avatar: string
  createdAt: Date
}

export interface IUserContext {
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
})

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null)
  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const userFromStorage = await AsyncStorage.getItem('loggedUser')
        if (userFromStorage) {
          setUser(JSON.parse(userFromStorage))
        }
      } catch (error) {
        console.error(error)
      }
    }
    getUserFromStorage()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
