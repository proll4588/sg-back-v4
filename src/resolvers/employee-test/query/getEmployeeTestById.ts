import { EmployeeTest } from '../../../models/employee-test/EmployeeTest.js';
import { EmployeeTestType } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { testId: number };
type Return = EmployeeTestType | null;

export type GetEmployeeTestByIdResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Employee];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  return await EmployeeTest.getEmployeeTest(args.testId);
};

export const getEmployeeTestByIdResolver: GetEmployeeTestByIdResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
