const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
    }),
  }),
});
