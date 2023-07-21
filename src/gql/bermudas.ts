import { gql } from '@apollo/client'

export const GET_ALL_BERMUDAS = gql`
  query GetAllBermudas {
    getAllBermudas {
      id
      imageUrl
      text
      createdAt
      user {
        avatar
        nickname
      }
    }
  }
`
