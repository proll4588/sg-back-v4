import { getAllUsers } from '../models/user.js';
import { checkResolver } from './checkResolver.js';
const qGetAllUsers = async () => {
    return await getAllUsers();
};
export const resolvers = {
    Query: {
        getUsers: async (...args) => await checkResolver(...args)([1])(qGetAllUsers),
    },
    Mutation: {
        hello(parent, args, context, info) {
            return '123';
        },
    },
};
