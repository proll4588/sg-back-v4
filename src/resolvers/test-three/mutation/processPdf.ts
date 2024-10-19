/* DEFINE */

import { TestThree } from '../../../models/test-three/testThree.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

type Args = { userId: number; file: string };
type Return = boolean;

export type ProcessPdfResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Teacher];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  await TestThree.processPdf(args.userId, args.file);
  return true;
};

export const processPdfResolver: ProcessPdfResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
