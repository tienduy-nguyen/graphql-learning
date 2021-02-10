import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@common/exceptions';
import { ClassType } from 'class-transformer/esm2015';
import { RequestHandler } from 'express';

// Validation with class-validator
export function validationMiddleware<T>(
  type: ClassType<T>,
  skipMissingProperties = false
): RequestHandler {
  return async (req, res, next) => {
    const parsedBody = plainToClass(type, req.body);
    const errors = await validate(parsedBody, { skipMissingProperties });
    if (errors.length !== 0) {
      const message = errors.join('').trimEnd();
      next(new BadRequestException(message));
    } else {
      req.body = parsedBody;
      next();
    }
  };
}
