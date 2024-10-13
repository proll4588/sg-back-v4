import bcrypt from 'bcrypt';
import { throwNewGQLError } from '../../../GraphQLError/GraphQLError.js';
import { ServerExceptions } from '../../../GraphQLError/type.js';
import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { signJWT } from '../../../auth/signJWT.js';
const ACCESS = [];
/* Fn */
const resolver = async (_, args) => {
    /* Проверка наличия пользователя */
    const user = await User.getUserByLogin(args.login);
    if (!user) {
        throwNewGQLError(ServerExceptions.USER_NOT_FOUND);
        return null;
    }
    /* Проверка валидности пароля */
    const userData = await user.getUserData();
    if (!userData) {
        throwNewGQLError(ServerExceptions.USER_NOT_FOUND);
        return null;
    }
    const validPass = bcrypt.compareSync(args.password, userData.password);
    if (!validPass) {
        throwNewGQLError(ServerExceptions.PASSWORD_IS_NOT_CORRECT);
        return null;
    }
    const token = signJWT(userData.id, userData.Role.id);
    return { token };
};
export const loginResolver = async (...args) => await checkResolver(...args)(ACCESS)(resolver);
