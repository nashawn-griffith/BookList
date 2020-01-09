const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const {getOneBook} = require('../controllers/queryControllers');

const mongoose = require('mongoose');

require('../models/authorSchema');
require('../models/bookSchema');

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
      resolve: async parent => {
        const {authorId} = parent;
        const existingAuthor = await Author.findOne({_id: authorId});
        return existingAuthor;
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
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve: async parent => {
        const bookList = await Book.find({authorId: parent._id});
        return bookList;
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
      resolve: async (parent, args, req) => {
        const {id} = args;
        const existingBook = await Book.findOne({_id: id});
        return existingBook;
      }
    },

    author: {
      type: AuthorType,
      args: {id: {type: new GraphQLNonNull(GraphQLString)}},
      resolve: async (parent, args) => {
        const {id} = args;
        const existingAuthor = await Author.findOne({_id: id});
        return existingAuthor;
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        const existingBooks = await Book.find();
        return existingBooks;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: async (parent, args) => {
        const existingAuthors = await Author.find();
        return existingAuthors;
      }
    }
  }
});

/* Mutation Object */
const MutationQuery = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: async (parent, args) => {
        const newAuthor = await Author.create(args);
        return newAuthor;
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: async (parentValue, args) => {
        const newBook = await Book.create(args);
        return newBook;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery
});

module.exports = schema;
