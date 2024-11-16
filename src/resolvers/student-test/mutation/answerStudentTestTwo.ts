import { StudentTest } from '../../../models/student-test/student-test/StudentTest.js';
import { StudentTestTwoAnswerType } from '../../../models/student-test/student-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  studentTestId: number;
  answers: StudentTestTwoAnswerType[];
};
type Return = boolean;

export type AnswerStudentTestTwoResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  try {
    const test = new StudentTest(args.studentTestId);
    await test.finishStudentTestTwo(args.answers);

    return true;
  } catch (error) {
    return false;
  }
};

export const answerStudentTestTwoResolver: AnswerStudentTestTwoResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
