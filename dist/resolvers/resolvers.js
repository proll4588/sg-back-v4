import { createUserResolver } from './user/mutation/createUser.js';
import { deleteUserResolver } from './user/mutation/deleteUser.js';
import { getStudentsUsersResolver } from './user/query/getStudentUsers.js';
import { getUserResolver } from './user/query/getUser.js';
import { getUsersResolver } from './user/query/getUsers.js';
import { getUsersRolesResolver } from './user/query/getUsersRoles.js';
export const resolvers = {
    Query: {
        /* User */
        getUser: getUserResolver,
        getUsers: getUsersResolver,
        getUsersRoles: getUsersRolesResolver,
        getStudentUsers: getStudentsUsersResolver,
        /* ==== */
    },
    Mutation: {
        /* User */
        deleteUser: deleteUserResolver,
        createUser: createUserResolver,
        /* ==== */
    },
};
