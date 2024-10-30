import { isAuthContext } from '../../../context/isAuthContext.js';
import { EmployeeTest } from '../../../models/employee-test/EmployeeTest.js';
import { EmployeeTestType } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { processId: number };
type Return = EmployeeTestType | null;

export type GetEmployeeTestByProcessIdResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Employee];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  if (isAuthContext(context)) {
    const res = await EmployeeTest.getEmployeeTestByProcessId(
      args.processId,
      context.userId
    );

    if (res) return res[0];
  }

  return null;
};

export const getEmployeeTestByProcessIdResolver: GetEmployeeTestByProcessIdResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
