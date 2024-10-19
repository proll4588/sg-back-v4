import { TestTwo } from '../../../models/test-two/testTwo.js';
import { TestTwoProcessType } from '../../../models/test-two/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = TestTwoProcessType[];

export type GetAllTestTwoProcessResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await TestTwo.getTestTwoAllProcesses();
};

export const getAllTestTwoProcessResolver: GetAllTestTwoProcessResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
