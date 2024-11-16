import { StudentTest } from '../../../models/student-test/student-test/StudentTest.js';
import { StudentTestOneAnswerType } from '../../../models/student-test/student-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  studentTestId: number;
  answers: StudentTestOneAnswerType[];
};
type Return = boolean;

export type AnswerStudentTestOneResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  try {
    const test = new StudentTest(args.studentTestId);
    await test.finishStudentTestOne(args.answers);

    return true;
  } catch (error) {
    return false;
  }
};

export const answerStudentTestOneResolver: AnswerStudentTestOneResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
