import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import session from 'express-session';
import { ormConfig } from '@common/configs/orm.config';
import { sessionConfig } from '@common/configs/session.config';
import { errorMiddleware } from '@common/global-middlewares';
import { apolloServerConfig } from '@common/configs/apollo-server.config';

const bootstrap = async () => {
  // Typeorm connection
  try {
    await createConnection(ormConfig());
    console.log('Database connected!');
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }

  const port = Number(process.env.PORT) || 3000;

  const apolloServer = new ApolloServer(await apolloServerConfig());

  const app: Application = express();
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: `http://localhost:${port}`,
    })
  );
  const sessionOptions = sessionConfig();
  app.use(session(sessionOptions));

  apolloServer.applyMiddleware({ app });
  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(
      `Server graphql is running at http://localhost:${port}/graphql`
    );
  });
};

Promise.resolve(bootstrap());
