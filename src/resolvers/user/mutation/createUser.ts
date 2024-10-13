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
  return await (
    await User.createUser(args.login, args.password, args.roleId)
  ).getUserData();
};

export const createUserResolver: CreateUserResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
