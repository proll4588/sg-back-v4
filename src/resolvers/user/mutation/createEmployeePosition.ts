import { Employee } from '../../../models/user/Employee.js';
import { EmployeePositionType } from '../../../models/user/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { title: string };
type Return = EmployeePositionType;

export type CreateEmployeePositionResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return await Employee.createEmployeePosition(args.title);
};

export const createEmployeePositionResolver: CreateEmployeePositionResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
