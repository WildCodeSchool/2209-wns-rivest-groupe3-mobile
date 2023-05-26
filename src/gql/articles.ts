import { gql } from '@apollo/client'

export const GET_ALL_ARTICLES_WITH_LIMIT_AND_TOTAL = gql`
  query getAllArticles($limit: Float, $offset: Float) {
    getAllArticles(limit: $limit, offset: $offset) {
      id
      title
      coverUrl
      blog {
        id
        name
        slug
        user {
          nickname
        }
      }
      slug
      postedAt
      createdAt
    }
    getNumberOfArticles
  }
`

export const GET_ONE_ARTICLE = gql`
  query ($slug: String!, $blogSlug: String!, $allVersions: Boolean) {
    getOneArticle(slug: $slug, blogSlug: $blogSlug, allVersions: $allVersions) {
      id
      postedAt
      show
      slug
      title
      coverUrl
      articleContent {
        version
        id
        current
        content {
          time
          version
          blocks {
            id
            type
            data {
              caption
              file {
                url
              }
              stretched
              withBackground
              withBorder
              text
              level
              style
              items
            }
          }
        }
      }
      version
    }
    getBlog(slug: $blogSlug) {
      id
      name
      description
      slug
      user {
        id
        avatar
        nickname
        city
        blogs {
          slug
        }
      }
    }
  }
`
