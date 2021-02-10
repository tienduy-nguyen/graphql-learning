import { logger } from '@common/global-middlewares/logger.middleware';
import { isAuth } from '@modules/user/middlewares/auth.middleware';
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
export class AppResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  public async hello(
    @Arg('name', { nullable: true, defaultValue: 'World!' }) name?: string
  ) {
    return `Hello ${name}`;
  }
}
