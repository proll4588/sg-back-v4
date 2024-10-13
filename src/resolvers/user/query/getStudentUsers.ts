import { UserType } from '../../../models/user/type.js';
import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = UserType[];

export type GetStudentsUsersResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Teacher];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await User.getStudentUsers();
};

export const getStudentsUsersResolver: GetStudentsUsersResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
