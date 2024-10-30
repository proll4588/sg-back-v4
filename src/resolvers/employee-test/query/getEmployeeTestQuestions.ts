import { EmployeeTestQuestionType } from '../../../models/employee-test/type.js';
import { EmployeeTest } from '../../../models/employee-test/EmployeeTest.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { testId: number };
type Return = EmployeeTestQuestionType[];

export type GetEmployeeTestQuestionsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Employee];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  return await EmployeeTest.getTestQuestions(args.testId);
};

export const getEmployeeTestQuestionsResolver: GetEmployeeTestQuestionsResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
