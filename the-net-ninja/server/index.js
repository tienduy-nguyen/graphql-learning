const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hi there!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port ', port);
});
