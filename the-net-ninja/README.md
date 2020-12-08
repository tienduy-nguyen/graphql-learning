# Books list project

Fullstack project using MongoDB - Express - React - NodeJS and GraphQL

Demo: 

Server app running at: [graphql-book.herokuapp.com/graphql](https://graphql-book-server.herokuapp.com/graphql)

Client app running at: [graphql-book.netlify.com](http://graphqlbook.netlify.app)

- [Books list project](#books-list-project)
  - [Pre-Installation](#pre-installation)
  - [Setup project](#setup-project)
  - [GraphQL](#graphql)
    - [Installation GraphQL](#installation-graphql)
    - [Create Schema](#create-schema)
  - [MongoDB](#mongodb)
  - [Reference](#reference)
  


## Pre-Installation
- Create `server` folder as a root of project
- In `server` folder, init `package.json`
  ```bash
  $ mkdir server
  $ cd server
  $ npm init -y
  ```
- Install dependencies
  Make sure you have `nodejs` installed on your machine;
  ```bash
  $ npm i express nodemon 
  ```
## Setup project
- Create `index.js` as a mail js file to run server
- In this `index.js` file, init server using `express` framework
  ```js
  //server/index.js
  const express = require('express');

  const app = express();

  app.get('/', (req, res) => {
    res.send('Hi there!');
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Server is running on port ', port);
  });

  ```
- Update `script` to run server in `package.json` file
  ```json
    "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  ```
- Run server to test the result
  ```bash
  $ npm run dev
  ```
## GraphQL
### Installation GraphQL
- Install GraphQL
  ```bash
  $ npm i graphql express-graphql
  ```
- Using `GraphQL` in `index.js` file
  
  Check out on [express-grapql](https://github.com/graphql/express-graphql)

### Create Schema

Check out on [GraphQL github](https://github.com/graphql/graphql-js)
- Create schema
  ```bash
  # In root project server
  $ mkdir schema
  $ touch schema/schema.js
  ```
- Update schema.js for Books
  ```js
  const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
  } = require('graphql');

  // dummy data
  const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
  ];

  const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
  ];

  const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return authors.filter((author) => author.id == parent.authorId)[0];
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
        resolve(parent, args) {
          return books.filter((book) => book.authorId == parent.id);
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
        resolve(parent, args) {
          // code to get data from db / other source
          const book = books.filter((book) => book.id == args.id)[0];
          return book;
        },
      },
      author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return authors.filter((author) => author.id == args.id)[0];
        },
      },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          return books;
        },
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
          return authors;
        },
      },
    },
  });

  module.exports = new GraphQLSchema({
    query: RootQuery,
  });

  ```
## MongoDB
- Installation
  ```bash
  $ npm i dotenv mongoose
  ```
- Setup mongoDB
  ```bash
  $ mkdir config
  $ cd config
  $ touch db.js
  ```

  ```js
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');

  dotenv.config();
  const db = process.env.MONGO_URI;

  const connectDB = async () => {
    try {
      await mongoose.connect(db, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('MongoDB has been connected');
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  };

  module.exports = connectDB;

  ```
- Update server file `index.js`
  ```js
  // root/index.js
  const express = require('express');
  const { graphqlHTTP } = require('express-graphql');
  const schema = require('./schema/schema');
  const dotenv = require('dotenv');
  const connectDB = require('./config/db');

  dotenv.config();

  const app = express();

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

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Server is running on port ', port);
  });

  ```
- Create models: create `models` folder in root project
  
  Create `Book` models: `Book.js`

  ```js
  // models/Book.js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const BookSchema = new Schema(
    {
      name: String,
      genre: String,
      author: {
        type: Schema.Types.ObjectId,
        ref: 'author',
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('book', BookSchema);

  ```
  Create `Author` model: `Author.js` file

  ```js
  // models/Author.js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const AuthorSchema = new Schema(
    {
      name: String,
      age: Number,
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('author', AuthorSchema);

  ```
## Reference

Learn GraphQL by The Net Ninja

[Ref](https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f)