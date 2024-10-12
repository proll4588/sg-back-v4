import { isAuthContext } from '../context/isAuthContext.js';
import { throwNewGQLError } from '../GraphQLError/GraphQLError.js';
import { ServerExceptions } from '../GraphQLError/type.js';
// endpoint: (...resArgs) => checkResolver(...resArgs)([1, 2, 3])(callback)
export const checkResolver = (parent, args, context, info) => {
    return (permRoleIds) => {
        if (permRoleIds.length !== 0) {
            if (!isAuthContext(context)) {
                throwNewGQLError(ServerExceptions.NO_PERMISSION);
            }
            //   @ts-ignore
            const { roleId } = context;
            if (!permRoleIds.some((permRoleId) => permRoleId === roleId)) {
                throwNewGQLError(ServerExceptions.NO_PERMISSION);
            }
        }
        return async (callback) => {
            return await callback(context, args);
        };
    };
};
