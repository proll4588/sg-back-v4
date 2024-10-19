import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';
import { TestOne } from '../../../models/test-one/testOne.js';
import { TestOneResultType } from '../../../models/test-one/type.js';

type Args = {};
type Return = TestOneResultType[];

export type GetTestOneResultsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await TestOne.getTestOneResults();
};

export const getTestOneResultsResolver: GetTestOneResultsResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
