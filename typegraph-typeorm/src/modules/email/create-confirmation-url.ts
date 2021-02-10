import { v4 as uuid } from 'uuid';
import { redis } from '@common/configs/redis';
import { REDIS_CONFIRM_USER_PREFIX } from '@common/constants/redis.constant';

export const createConfirmationUrl = async (userId: string) => {
  const token = uuid();
  await redis.set(
    REDIS_CONFIRM_USER_PREFIX + token,
    userId,
    'ex',
    60 * 60 * 24
  ); //24h expiration

  return `http://localhost:3000/user/confirm/${token}`;
};
