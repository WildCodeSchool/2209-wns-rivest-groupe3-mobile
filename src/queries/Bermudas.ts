import { gql } from '@apollo/client'

export const CREATE_BERMUDA = gql`
  mutation CreateBermuda($imageUrl: String!, $text: String!) {
    createBermuda(imageUrl: $imageUrl, text: $text) {
      id
    }
  }
`
