import { UserResolver } from '@modules/user/user.resolver';
import { buildSchema } from 'type-graphql';
import { AppResolver } from './app.resolver';

export const appSchema = async () => {
  const schemas = await buildSchema({
    resolvers: [AppResolver, UserResolver],
  });
  return schemas;
};
