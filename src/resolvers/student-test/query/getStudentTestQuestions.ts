import { StudentTest } from '../../../models/student-test/student-test/StudentTest.js';
import { StudentTestQuestionType } from '../../../models/student-test/student-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  studentTestId: number;
};
type Return = StudentTestQuestionType[];

export type GetStudentTestQuestionsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return await StudentTest.getTestQuestions(args.studentTestId);
};

export const getStudentTestQuestionsResolver: GetStudentTestQuestionsResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
