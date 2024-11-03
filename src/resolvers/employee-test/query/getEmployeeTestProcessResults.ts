// getEmployeeTestProcessResults

import { EmployeeTestProcess } from '../../../models/employee-test/EmployeeTestProcess.js';
import { EmployeeTestProcessResultType } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { processId: number };
type Return = EmployeeTestProcessResultType[];

export type GetEmployeeTestProcessResultsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  const process = new EmployeeTestProcess(args.processId);
  return await process.getResults();
};

export const getEmployeeTestProcessResultsResolver: GetEmployeeTestProcessResultsResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
