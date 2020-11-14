const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();
// Allow cross-origin requests
app.use(cors());

connectDB();

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running on port', port);
});
