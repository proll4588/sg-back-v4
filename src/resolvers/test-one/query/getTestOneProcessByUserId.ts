/* DEFINE */

import { TestOne } from '../../../models/test-one/testOne.js';
import { TestOneProcessType } from '../../../models/test-one/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

type Args = { userId: number };
type Return = TestOneProcessType | null;

export type GetTestOneProcessByUserIdResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return (await TestOne.getTestOneByUserId(args.userId))?.getData() || null;
};

export const getTestOneProcessByUserIdResolver: GetTestOneProcessByUserIdResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
