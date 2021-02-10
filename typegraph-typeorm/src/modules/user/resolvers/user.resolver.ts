import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import {
  LoginUserInput,
  RegisterUserInput,
  UserWhereUniqueInput,
} from '../dto';
import { User } from '../user.model';
import bcrypt from 'bcrypt';
import { IHttpContext } from '@common/global-interfaces/http.interface';
import { isAuth } from '../middlewares/auth.middleware';
import { logger } from '@common/global-middlewares/logger.middleware';
import { redis } from '@common/configs/redis';
import { BadRequestException, NotFoundException } from '@common/exceptions';
import { sendMail } from '@modules/email/send-email';
import { createConfirmationUrl } from '@modules/email/create-confirmation-url';
import { ResendRegisterTokenInput } from '../dto/resend-register-token.input';
import {
  REDIS_FORGOT_PASSWORD_PREFIX,
  REDIS_KEY_SESSION,
} from '@common/constants/redis.constant';
import { v4 as uuid } from 'uuid';
import { ChangePasswordInput } from '../dto/change-password.input';

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

    await sendMail(data.email, await createConfirmationUrl(user.id));
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
    if (!user) throw new BadRequestException('Invalid credentials');
    const valid = await bcrypt.compare(data.password, (await user).password);
    if (!valid) throw new BadRequestException('Invalid credentials');

    if (!user.confirmed) {
      throw new BadRequestException('Email is not confirmed');
    }

    ctx.req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  public async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(token);
    if (!userId) {
      return false;
    }
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(token);

    return true;
  }

  @Mutation(() => Boolean)
  public async resendRegisterToken(
    @Arg('data') data: ResendRegisterTokenInput
  ) {
    const user = await User.findOneOrFail({ where: { email: data.email } });
    if (!user) throw new BadRequestException('Email do not exist');
    await sendMail(data.email, await createConfirmationUrl(user.id));
    return true;
  }

  @Mutation(() => Boolean)
  public async forgotPassword(@Arg('email') email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const token = uuid();
    await redis.set(
      REDIS_FORGOT_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      60 * 60 * 24
    );
    await sendMail(email, `http://localhost:3000/change-password/${token}`);
    return true;
  }

  @Mutation(() => User)
  public async changePassword(
    @Arg('data') { token, oldPassword, newPassword }: ChangePasswordInput,
    @Ctx() ctx: IHttpContext
  ) {
    const userId = await redis.get(REDIS_FORGOT_PASSWORD_PREFIX + token);
    if (!userId) {
      throw new BadRequestException('Token not valid');
    }
    const user = await User.findOneOrFail(userId);
    if (!user) {
      throw new NotFoundException('User not found with given token');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Old password is not matches');

    await redis.del(REDIS_FORGOT_PASSWORD_PREFIX + token);

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    ctx.req.session!.userId = user.id;
    return user;
  }

  @Mutation(() => Boolean)
  public async logout(@Ctx() ctx: IHttpContext): Promise<Boolean> {
    try {
      ctx.req.res?.clearCookie(REDIS_KEY_SESSION);
      await ctx.req.session!.destroy();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
