const {
  GraphqlSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const Book = mongoose.model('book');
const Author = mongoose.model('author');

//create a book type. it should have fields with id,name, genre

/**
 * Create Book object type
 */
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve: parent => {
        console.log(parent);
      }
    }
  })
});

/**
 * Author object type
 */

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GrpahQLString},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve: parent => {
        console.log(parent);
      }
    }
  })
});

/**
 * Root Query Object type
 */

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: new GraphQLNonNull(GraphQLString)}},
      resolve: (parent, args) => {
        console.log(args);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: new GraphQLNonNull(GraphQLString)}},
      resolve: (parent, args) => {
        console.log(args);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        console.log('return books');
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        console.log('return authors');
      }
    }
  }
});

const schema = new GraphqlSchema({
  query: RootQuery,
  mutation: ''
});

module.exports = schema;
