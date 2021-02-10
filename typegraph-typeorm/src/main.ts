import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import { appSchema } from '@app/app.schema';
import cors from 'cors';
import session from 'express-session';
import { ormConfig } from '@common/configs/orm.config';
import { sessionConfig } from '@common/configs/session.config';

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
  const schema = await appSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });

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

  app.listen(port, () => {
    console.log(
      `Server graphql is running at http://localhost:${port}/graphql`
    );
  });
};

bootstrap();
