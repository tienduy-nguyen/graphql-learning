import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello-resolver';
import express, { Application } from 'express';

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({ schema });
  const app: Application = express();
  app.use(express.json());

  apolloServer.applyMiddleware({ app });
  const port = Number(process.env.PORT) || 1900;

  app.listen(port, () => {
    console.log(
      `Server graphql is running at http://localhost:${port}/graphql`
    );
  });
};

bootstrap();
