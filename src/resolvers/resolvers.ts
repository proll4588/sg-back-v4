import { getAllUsers } from '../models/user.js';
import { checkResolver } from './checkResolver.js';
import { Resolvers } from './type.js';

const qGetAllUsers = async () => {
  return await getAllUsers();
};

export const resolvers: Resolvers = {
  Query: {
    getUsers: async (...args) =>
      await checkResolver<{}, { id: number }[]>(...args)([1])(qGetAllUsers),
  },
  Mutation: {
    hello(parent, args, context, info) {
      return '123';
    },
  },
};
