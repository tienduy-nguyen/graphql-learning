import { createResolver } from '@common/abstract-resolvers/create-resolver';
import { RegisterUserInput } from '../dto';
import { User } from '../user.model';

export const CreateUserResolver = createResolver(
  'User',
  User,
  RegisterUserInput,
  User
);
