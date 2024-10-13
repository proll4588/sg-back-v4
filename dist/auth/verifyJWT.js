import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const secret = process.env.SECRET || '';
export const verifyJWT = (token) => {
    const info = jwt.verify(token, secret);
    return { userId: info.userId, roleId: info.roleId };
};
