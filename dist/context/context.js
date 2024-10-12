import { verifyJWT } from '../auth/verifyJWT.js';
import { ServerExceptions } from '../GraphQLError/type.js';
import { throwNewGQLError } from '../GraphQLError/GraphQLError.js';
export const context = async ({ req }) => {
    const token = req.headers.authorization;
    if (!token)
        return {};
    try {
        return verifyJWT(token);
    }
    catch (error) {
        throwNewGQLError(ServerExceptions.USER_IS_NOT_AUTHENTICATED);
        return {};
    }
};
