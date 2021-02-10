import { HttpException } from '@common/exceptions';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500);
  res.send({
    errors: {
      message: err.message || 'Inferrer error server!',
    },
  });
};
