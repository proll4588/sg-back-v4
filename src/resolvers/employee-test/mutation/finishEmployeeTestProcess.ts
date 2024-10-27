import { EmployeeTestProcess } from '../../../models/employee-test/EmployeeTestProcess.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  processId: number;
};
type Return = boolean;

export type FinishEmployeeTestProcessResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const test = new EmployeeTestProcess(args.processId);
  await test.finish();
  return true;
};

export const finishEmployeeTestProcessResolver: FinishEmployeeTestProcessResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
