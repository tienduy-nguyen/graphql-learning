import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { LoginUserInput, RegisterUserInput, UserWhereUniqueInput } from './dto';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import { IHttpContext } from '@common/global-interfaces/http.interface';
import { isAuth } from './middlewares/auth.middleware';
import { logger } from '@common/global-middlewares/logger.middleware';

@Resolver(() => User)
export class UserResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => [User])
  public async users() {
    return await User.find();
  }

  @UseMiddleware(isAuth, logger)
  @Query(() => User)
  public async user(@Arg('where') where: UserWhereUniqueInput) {
    return await User.findOneOrFail({ where });
  }

  @UseMiddleware(isAuth, logger)
  @Query(() => User)
  public async me(@Ctx() ctx: IHttpContext) {
    const userId = ctx.req.session!.userId;
    if (!userId) {
      return undefined;
    }
    return await User.findOneOrFail(userId);
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

  @Mutation(() => User)
  public async login(
    @Arg('data') data: LoginUserInput,
    @Ctx() ctx: IHttpContext
  ): Promise<User | null> {
    const where: UserWhereUniqueInput = {
      email: data.email,
    };
    const user = await User.findOneOrFail({ where });
    if (!user) return null;
    const valid = await bcrypt.compare(data.password, (await user).password);
    if (!valid) return null;

    ctx.req.session!.userId = user.id;

    return user;
  }
}
