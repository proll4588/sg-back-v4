import { UserType } from '../../../models/user/type.js';
import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { roleId?: number };
type Return = UserType[];

export type GetUsersResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  if (args.roleId) return await User.getUsersByRole(args.roleId);
  else return await User.getAllUsers();
};

export const getUsersResolver: GetUsersResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
