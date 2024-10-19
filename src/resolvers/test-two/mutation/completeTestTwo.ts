import { TestTwo } from '../../../models/test-two/testTwo.js';
import { TestTwoProcessType } from '../../../models/test-two/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { processId: number };
type Return = TestTwoProcessType | null;

export type CompleteTestTwoResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const process = new TestTwo(args.processId);
  await process.complete();
  return await process.getData();
};

export const completeTestTwoResolver: CompleteTestTwoResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
