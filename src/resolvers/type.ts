import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../context/type.js';
import { GetUserResolverFun } from './user/query/getUser.js';
import { GetUsersResolverFun } from './user/query/getUsers.js';
import { GetUsersRolesResolverFun } from './user/query/getUsersRoles.js';
import { GetStudentsUsersResolverFun } from './user/query/getStudentUsers.js';
import { DeleteUserResolverFun } from './user/mutation/deleteUser.js';
import { CreateUserResolverFun } from './user/mutation/createUser.js';
import { LoginResolverFun } from './auth/mutation/login.js';

export type ResolverFn<Args, ReturnType> = (
  parent: unknown,
  args: Args,
  context: ApolloContext,
  info: GraphQLResolveInfo
) => Promise<ReturnType> | ReturnType;

export interface Resolvers {
  Query: {
    /* User */
    getUser: GetUserResolverFun;
    getUsers: GetUsersResolverFun;
    getUsersRoles: GetUsersRolesResolverFun;
    getStudentUsers: GetStudentsUsersResolverFun;
    /* ==== */
  };
  Mutation: {
    /* User */
    deleteUser: DeleteUserResolverFun;
    createUser: CreateUserResolverFun;
    /* ==== */

    /* Auth */
    login: LoginResolverFun;
    /* ==== */
  };
}

export type ResolverCallbackFn<Args, ReturnType> = (
  context: ApolloContext,
  args: Args
) => ReturnType | Promise<ReturnType>;
