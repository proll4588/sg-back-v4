import jwt from 'jsonwebtoken';
const secret = process.env.SECRET || '';
export const signJWT = (userId, roleId) => {
    return jwt.sign({ userId, roleId }, secret, { expiresIn: '24h' });
};
