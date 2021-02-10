import { REDIS_KEY_SESSION } from '@common/constants/redis.constant';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';

export const sessionConfig = () => {
  const redis = new Redis();
  const RedisStore = connectRedis(session);
  return {
    store: new RedisStore({
      client: redis as any,
    }),
    name: REDIS_KEY_SESSION,
    secret: 'someVeryStrongSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
  };
};
