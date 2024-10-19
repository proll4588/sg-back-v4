/* DEFINE */

import { TestTwo } from '../../../models/test-two/testTwo.js';
import { TestTwoResultType } from '../../../models/test-two/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

type Args = {};
type Return = TestTwoResultType[];

export type GetTestTwoResultsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return await TestTwo.getTestTwoResults();
};

export const getTestTwoResultsResolver: GetTestTwoResultsResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
