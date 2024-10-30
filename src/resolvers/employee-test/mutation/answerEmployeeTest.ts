import { EmployeeTest } from '../../../models/employee-test/EmployeeTest.js';
import { CompleteEmployeeTestAnswer } from '../../../models/employee-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { testId: number; answers: CompleteEmployeeTestAnswer[] };
type Return = boolean;

export type AnswerEmployeeTestResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Employee];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const test = new EmployeeTest(args.testId);
  await test.answerTestQuestion(args.answers);
  return true;
};

export const answerEmployeeTestResolver: AnswerEmployeeTestResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
