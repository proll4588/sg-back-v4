import { EmployeeTestProcess } from '../../../models/employee-test/EmployeeTestProcess.js';
import { EmployeeTestProcessType } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { processId: number };
type Return = EmployeeTestProcessType | null;

export type GetEmployeeTestProcessByIdResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Employee];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  return await EmployeeTestProcess.getEmployeeTestProcess(args.processId);
};

export const getEmployeeTestProcessByIdResolver: GetEmployeeTestProcessByIdResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
