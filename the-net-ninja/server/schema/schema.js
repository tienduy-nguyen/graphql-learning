const Book = require('../models/Book');
const Author = require('../models/Author');

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        const author = Author.findById(parent.author);
        console.log(author);
        return author;
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const books = await Book.find({ author: parent });
        return books;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // argument pass to query, here we use id to find the book
      async resolve(parent, args) {
        // code to get data from db / other source
        const book = await Book.findById(args.id);
        return book;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const author = await Author.findById(args.id);
        return author;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const books = await Book.find();
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        const authors = await Author.find();
        return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        const newAuthor = await author.save();
        return newAuthor;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        let author = await Author.findById(args.authorId);
        console.log(author);
        let book = new Book({
          name: args.name,
          genre: args.genre,
          author: author,
        });
        const newBook = await book.save();
        return newBook;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
