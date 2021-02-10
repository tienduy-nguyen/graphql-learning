import { v4 as uuid } from 'uuid';
import { redis } from '@common/configs/redis';

export const createConfirmationUrl = async (userId: string) => {
  const token = uuid();
  await redis.set(token, userId, 'ex', 60 * 60 * 24); //24h expiration

  return `http://localhost:3000/user/confirm/${token}`;
};
