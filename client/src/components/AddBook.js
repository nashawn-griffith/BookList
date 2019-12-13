import React, {Component, Fragment} from 'react';
import {graphql} from 'react-apollo';
import {getAllAuthors} from '../queries/queries';

class AddBook extends Component {
  /**
   * function that populates the dropdown lists with
   * the authors
   */
  displayAuthors = () => {
    const {data} = this.props;

    //Authors are found. Display list of authors
    if (!data.loading) {
      return data.map(({id, name}) => {
        return <option key={id}>{name}</option>;
      });
    }
  };
  render() {
    return (
      <Fragment>
        <form>
          <label htmlFor='bookName'>Book name: </label>
          <input id='bookName' type='text' />

          <label htmlFor='genre'>Genre: </label>
          <input id='genre' type='text' />

          <label>Author:</label>
          <select>
            <option>Select Author</option>
            <hr />
            {this.displayAuthors()}
          </select>
        </form>
      </Fragment>
    );
  }
}

export default graphql(getAllAuthors)(AddBook);
