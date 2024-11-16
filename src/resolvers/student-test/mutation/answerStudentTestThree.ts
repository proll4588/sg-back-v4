import { StudentTest } from '../../../models/student-test/student-test/StudentTest.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  studentTestId: number;
  fileBase64: string;
};
type Return = boolean;

export type AnswerStudentTestThreeResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  await StudentTest.finishStudentTestThree(args.studentTestId, args.fileBase64);

  return true;
};

export const answerStudentTestThreeResolver: AnswerStudentTestThreeResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
