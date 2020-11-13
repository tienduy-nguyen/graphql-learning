const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

// dummy data
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, // argument pass to query, here we use id to find the book
      resolve(parent, args) {
        // code to get data from db / other source
        const book = books.filter((book) => book.id == args.id)[0];
        console.log(book);
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
