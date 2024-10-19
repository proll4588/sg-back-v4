import { TestOne } from '../../../models/test-one/testOne.js';
import { TestOneProcessType } from '../../../models/test-one/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { userId: number };
type Return = TestOneProcessType | null;

export type StartTestOneResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return await (await TestOne.createTestOneProcess(args.userId)).getData();
};

export const startTestOneResolver: StartTestOneResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
