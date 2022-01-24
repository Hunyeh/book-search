import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
          email
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation login ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook ($authors: [String!], $description: String!,
    $title: String!, $image: String!, $bookId: ID!, $link: String!) {
      saveBook(authors: $authors, description: $description, title: $title, image: $image, bookId: $bookId, link: $link) {
        email
        savedBooks {
          bookId
          authors
          description
          title
          link
          image
        }
      }
    }
`;

export const REMOVE_BOOK = gql`
mutation removeBook ($bookId: ID!) {
    removeBook (bookId: $bookId) {
      email
      savedBooks {
        bookId
      }
    }
  }
`;