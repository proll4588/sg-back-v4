import { TestTwo } from '../../../models/test-two/testTwo.js';
import { TestTwoProcessType } from '../../../models/test-two/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { userId: number };
type Return = TestTwoProcessType | null;

export type StartTestTwoResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return await TestTwo.startTestTwo(args.userId);
};

export const startTestTwoResolver: StartTestTwoResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
