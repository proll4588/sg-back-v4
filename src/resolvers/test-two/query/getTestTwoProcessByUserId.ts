import { TestTwo } from '../../../models/test-two/testTwo.js';
import { TestTwoProcessType } from '../../../models/test-two/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { userId: number };
type Return = TestTwoProcessType | null;

export type GetTestTwoProcessByUserIdResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const process = await TestTwo.getTestTwoByUserId(args.userId);
  if (!process) return null;
  else return await process.getData();
};

export const getTestTwoProcessByUserIdResolver: GetTestTwoProcessByUserIdResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
