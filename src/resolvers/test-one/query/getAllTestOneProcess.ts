import { TestOne } from '../../../models/test-one/testOne.js';
import { TestOneProcessType } from '../../../models/test-one/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = TestOneProcessType[];

export type GetAllTestOneProcessResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await TestOne.getAllTestOne();
};

export const getAllTestOneProcessResolver: GetAllTestOneProcessResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
