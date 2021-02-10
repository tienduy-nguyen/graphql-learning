import { IHttpContext } from '@common/global-interfaces/http.interface';
import { MiddlewareFn } from 'type-graphql';

export const logger: MiddlewareFn<IHttpContext> = async ({ args }, next) => {
  console.log('args: ', args);

  return next();
};
