import { EmployeeTest } from '../../../models/employee-test/EmployeeTest.js';
import { EmployeeTestVariantType } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = EmployeeTestVariantType[];

export type GetEmployeeTestVariantsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await EmployeeTest.getEmployeeTestVariants();
};

export const getEmployeeTestVariantsResolver: GetEmployeeTestVariantsResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
