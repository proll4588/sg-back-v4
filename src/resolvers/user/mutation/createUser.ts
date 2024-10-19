import bcrypt from 'bcrypt';
import { throwNewGQLError } from '../../../GraphQLError/GraphQLError.js';
import { ServerExceptions } from '../../../GraphQLError/type.js';
import { UserType } from '../../../models/user/type.js';
import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { login: string; password: string; roleId: number };
type Return = UserType | null;

export type CreateUserResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  try {
    return await (
      await User.createUser(
        args.login,
        bcrypt.hashSync(args.password, 7),
        args.roleId
      )
    ).getUserData();
  } catch (error) {
    throwNewGQLError(ServerExceptions.USER_IS_ALREADY_EXIST);
    return null;
  }
};

export const createUserResolver: CreateUserResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
