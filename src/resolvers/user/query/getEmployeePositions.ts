import { EmployeePositionType } from '../../../models/user/type.js';
import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = EmployeePositionType[];

export type GetEmployeePositionsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await User.getEmployeePositions();
};

export const getEmployeePositionsResolver: GetEmployeePositionsResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
