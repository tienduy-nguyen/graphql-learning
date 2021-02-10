import { IHttpContext } from '@common/global-interfaces/http.interface';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<IHttpContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Not authenticated');
  }
  return next();
};
