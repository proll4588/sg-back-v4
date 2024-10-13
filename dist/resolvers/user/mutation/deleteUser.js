import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
const ACCESS = [Role.Admin];
/* Fn */
const resolver = async (_, args) => {
    const res = await new User(args.userId).deleteUser();
    return !!res;
};
export const deleteUserResolver = async (...args) => await checkResolver(...args)(ACCESS)(resolver);
