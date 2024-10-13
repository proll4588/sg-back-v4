import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
const ACCESS = [Role.Admin];
/* Fn */
const resolver = async (_, args) => {
    return await (await User.createUser(args.login, args.password, args.roleId)).getUserData();
};
export const createUserResolver = async (...args) => await checkResolver(...args)(ACCESS)(resolver);
