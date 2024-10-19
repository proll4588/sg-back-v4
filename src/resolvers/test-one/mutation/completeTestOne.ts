import { TestOne } from '../../../models/test-one/testOne.js';
import { TestOneProcessType } from '../../../models/test-one/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { processId: number };
type Return = TestOneProcessType | null;

export type CompleteTestOneResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const process = new TestOne(args.processId);
  await process.complete();
  return process.getData();
};

export const completeTestOneResolver: CompleteTestOneResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
