import { Employee } from '../../../models/user/Employee.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { employeeId: number };
type Return = boolean;

export type DeleteEmployeeResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const employee = new Employee(args.employeeId);
  await employee.deleteEmployee();
  return true;
};

export const deleteEmployeeResolver: DeleteEmployeeResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
