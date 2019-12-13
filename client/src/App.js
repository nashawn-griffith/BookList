import React, {Fragment} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

/**
 * Setup ApolloClient
 */
const client = ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Fragment>
        <h1>Book List</h1>
        <BookList />
        <AddBook />
      </Fragment>
    </ApolloProvider>
  );
};

export default App;
