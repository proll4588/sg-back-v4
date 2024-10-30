import { EmployeeTest } from '../../../models/employee-test/EmployeeTest.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { testId: number };
type Return = boolean;

export type FinishEmployeeTestResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Employee];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  const test = new EmployeeTest(args.testId);
  test.finishTest();
  return true;
};

export const finishEmployeeTestResolver: FinishEmployeeTestResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
