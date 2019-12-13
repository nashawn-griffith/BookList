import {gql} from 'apollo-boost';

/**
 * Query to get all books
 */

export const getAllBooks = gql`
  {
    books {
      name
      id
    }
  }
`;

/**
 * Query to get all authors
 */

export const getAllAuthors = gql`
  {
    authors {
      name
      id
    }
  }
`;
