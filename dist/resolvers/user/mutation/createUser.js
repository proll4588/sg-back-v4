import { throwNewGQLError } from '../../../GraphQLError/GraphQLError.js';
import { ServerExceptions } from '../../../GraphQLError/type.js';
import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
const ACCESS = [Role.Admin];
/* Fn */
const resolver = async (_, args) => {
    try {
        return await (await User.createUser(args.login, args.password, args.roleId)).getUserData();
    }
    catch (error) {
        throwNewGQLError(ServerExceptions.USER_IS_ALREADY_EXIST);
        return null;
    }
};
export const createUserResolver = async (...args) => await checkResolver(...args)(ACCESS)(resolver);
