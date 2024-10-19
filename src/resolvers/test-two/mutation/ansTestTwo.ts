import { TestTwo } from '../../../models/test-two/testTwo.js';
import { TestTwoProcessType } from '../../../models/test-two/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { processId: number; questionId: number; ans: boolean };
type Return = TestTwoProcessType | null;

export type AnsTestTwoResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const process = new TestTwo(args.processId);
  await process.answer(args.questionId, args.ans);
  return await process.getData();
};

export const ansTestTwoResolver: AnsTestTwoResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
