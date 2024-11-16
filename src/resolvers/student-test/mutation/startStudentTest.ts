import { isAuthContext } from '../../../context/isAuthContext.js';
import { StudentTest } from '../../../models/student-test/student-test/StudentTest.js';
import { Student } from '../../../models/user/Student.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  studentTestProcessId: number;
};
type Return = number | null;

export type StartStudentTestResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  if (!isAuthContext(context)) return null;
  const student = await Student.getStudentByUserId(context.userId);
  if (!student) return null;

  try {
    const test = await StudentTest.startStudentTest(
      student.passbookNumber,
      args.studentTestProcessId
    );

    return test?.id ?? null;
  } catch (error) {
    return null;
  }
};

export const startStudentTestResolver: StartStudentTestResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
