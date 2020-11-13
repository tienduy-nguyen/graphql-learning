# Books list project

Fullstack project using MongoDB - Express - React - NodeJS and GraphQL

## Installation
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


  ```
## Reference

Learn GraphQL by The Net Ninja

[Ref](https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f)