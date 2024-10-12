import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || '';

export const signJWT = (userId: number, roleId: number) => {
  return jwt.sign({ userId, roleId }, secret, { expiresIn: '24h' });
};
