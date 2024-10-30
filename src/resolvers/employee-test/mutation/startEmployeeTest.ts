import { isAuthContext } from '../../../context/isAuthContext.js';
import { EmployeeTest } from '../../../models/employee-test/EmployeeTest.js';
import { EmployeeTestType } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { testProcessId: number };
type Return = EmployeeTestType | null;

export type StartEmployeeTestResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Employee];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  if (isAuthContext(context))
    return await EmployeeTest.startTest(args.testProcessId, context.userId);

  return null;
};

export const startEmployeeTestResolver: StartEmployeeTestResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
