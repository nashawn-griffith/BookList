import React, {Component, Fragment} from 'react';
import {graphql} from 'react-apollo';
import {getAllBooks} from '../queries/queries';
class BookList extends Component {
  /**
   * Fetch books and render the lists
   */
  displayBooks = () => {
    //get data from the server
    const {data} = this.props;

    //check if data is loading
    if (data.loading) {
      return <h3>Data Loading</h3>;
    }

    //data is found. return list of books
    return (
      <ul>
        {data.map(({id, name}) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
    );
  };

  render() {
    return <Fragment>{this.displayBooks()}</Fragment>;
  }
}

export default graphql(getAllBooks)(BookList);
