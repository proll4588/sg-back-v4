import { TestOne } from '../../../models/test-one/testOne.js';
import { TestOneProcessType } from '../../../models/test-one/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { processId: number; questionId: number; ans: number };
type Return = TestOneProcessType | null;

export type AnsTestOneResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const process = new TestOne(args.processId);
  await process.addAnswer(args.questionId, args.ans);
  return process.getData();
};

export const ansTestOneResolver: AnsTestOneResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
