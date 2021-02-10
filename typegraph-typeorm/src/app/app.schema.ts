import { UserResolver } from '@modules/user/resolvers/user.resolver';
import { buildSchema } from 'type-graphql';
import { AppResolver } from './app.resolver';

export const appSchema = async () => {
  const schemas = await buildSchema({
    resolvers: [AppResolver, UserResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
  return Promise.resolve(schemas);
};
