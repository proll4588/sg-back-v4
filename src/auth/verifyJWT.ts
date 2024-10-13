import * as dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import { AuthApolloContext } from '../context';

const secret = process.env.SECRET || '';

export const verifyJWT = (token: string) => {
  const info = jwt.verify(token, secret) as AuthApolloContext;
  return { userId: info.userId, roleId: info.roleId };
};
