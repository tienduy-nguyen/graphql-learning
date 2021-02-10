import { User } from '@modules/user/user.model';
import { Response } from 'express';

export interface IHttpContext {
  req?: IRequestWithUser;
  res?: Response;
}
export interface IRequestWithUser {
  session?: any;
  user?: User;
  res?: Response;
}

export interface IUserFromRequest {
  id: string;
  email: string;
  username?: string;
}
