import { User } from '../../../models/user/user.js';
import { isAuthContext } from '../../../context/isAuthContext.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
const ACCESS = [Role.Admin, Role.Teacher, Role.Student];
/* Fn */
const resolver = async (context) => {
    // TODO: Мб переделать тип, передавать флаг что авторизирован и не
    // делать эти проверки
    if (isAuthContext(context))
        return await User.getUserById(context.userId);
    else
        return null;
};
export const getUserResolver = async (...args) => await checkResolver(...args)(ACCESS)(resolver);
