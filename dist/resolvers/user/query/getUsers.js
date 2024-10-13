import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
const ACCESS = [Role.Admin];
/* Fn */
const resolver = async (_, args) => {
    if (args.roleId)
        return await User.getUsersByRole(args.roleId);
    else
        return await User.getAllUsers();
};
export const getUsersResolver = async (...args) => await checkResolver(...args)(ACCESS)(resolver);
