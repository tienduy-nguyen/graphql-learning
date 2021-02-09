import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import { appSchema } from '@app/app.schema';

const bootstrap = async () => {
  await createConnection();

  const schema = await appSchema();
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
