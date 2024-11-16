import { Employee } from '../../../models/user/Employee.js';
import { EmployeeType } from '../../../models/user/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';
import bcrypt from 'bcrypt';
/* DEFINE */

type Args = {
  login: string;
  password: string;
  positionId: number;
  name: string;
  email: string;
};
type Return = EmployeeType;

export type CreateEmployeeResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return await Employee.createEmployee(
    args.login,
    bcrypt.hashSync(args.password, 7),
    args.positionId,
    args.name,
    args.email
  );
};

export const createEmployeeResolver: CreateEmployeeResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
