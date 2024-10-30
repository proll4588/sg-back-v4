import { isAuthContext } from '../../../context/isAuthContext.js';
import { EmployeeTestProcess } from '../../../models/employee-test/EmployeeTestProcess.js';
import { EmployeeTestProcessType } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = EmployeeTestProcessType[];

export type GetAvailableEmployeeTestProcessesResolverFun = ResolverFn<
  Args,
  Return
>;

const ACCESS = [Role.Employee];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  if (isAuthContext(context))
    return await EmployeeTestProcess.getAvailableEmployeeTestProcesses(
      context.userId
    );

  return [];
};

export const getAvailableEmployeeTestProcessesResolver: GetAvailableEmployeeTestProcessesResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
