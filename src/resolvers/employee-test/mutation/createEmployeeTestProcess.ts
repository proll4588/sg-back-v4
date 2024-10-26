import { isAuthContext } from '../../../context/isAuthContext.js';
import { EmployeeTest } from '../../../models/employee-test/EmployeeTest.js';
import { EmployeeTestProcessType } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  title: string;
  employeeIds: number[];
  testVariantId: number;
};
type Return = EmployeeTestProcessType | null;

export type CreateEmployeeTestProcessResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  if (isAuthContext(context))
    return await EmployeeTest.createEmployeeTestProcess({
      title: args.title,
      userId: context.userId,
      testVariantId: args.testVariantId,
      employeeIds: args.employeeIds,
    });

  return null;
};

export const createEmployeeTestProcessResolver: CreateEmployeeTestProcessResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
