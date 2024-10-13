import { RoleType } from '../../../models/user/type.js';
import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = RoleType[];

export type GetUsersRolesResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await User.getUsersRoles();
};

export const getUsersRolesResolver: GetUsersRolesResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
