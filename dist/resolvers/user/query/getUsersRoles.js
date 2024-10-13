import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
const ACCESS = [Role.Admin];
/* Fn */
const resolver = async () => {
    return await User.getUsersRoles();
};
export const getUsersRolesResolver = async (...args) => await checkResolver(...args)(ACCESS)(resolver);
