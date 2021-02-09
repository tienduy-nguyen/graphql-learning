import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { RegisterUserInput, UserWhereUniqueInput } from './dto';
import { User } from './user.model';
import bcrypt from 'bcrypt';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  public async user(@Arg('where') where: UserWhereUniqueInput) {
    return User.findOne({ where });
  }

  /* Mutations */
  @Mutation(() => User)
  public async register(@Arg('data') data: RegisterUserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await User.create({
      ...data,
      password: hashedPassword,
    }).save();
    return user;
  }
}
