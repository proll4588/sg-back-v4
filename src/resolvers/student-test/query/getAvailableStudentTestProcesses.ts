import { isAuthContext } from '../../../context/isAuthContext.js';
import { StudentTestProcess } from '../../../models/student-test/student-test-process/StudentTestProcess.js';
import { StudentTestProcessListItemWithStudentTest } from '../../../models/student-test/student-test-process/type.js';
import { Student } from '../../../models/user/Student.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = StudentTestProcessListItemWithStudentTest[];

export type GetAvailableStudentTestProcessesResolverFun = ResolverFn<
  Args,
  Return
>;

const ACCESS = [Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context) => {
  if (!isAuthContext(context)) return [];

  const student = await Student.getStudentByUserId(context.userId);

  if (!student) return [];

  return await StudentTestProcess.getAvailableStudentTestProcesses(
    student.passbookNumber
  );
};

export const getAvailableStudentTestProcessesResolver: GetAvailableStudentTestProcessesResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
