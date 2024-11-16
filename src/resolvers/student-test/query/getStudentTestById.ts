import { StudentTest } from '../../../models/student-test/student-test/StudentTest.js';
import { StudentTestType } from '../../../models/student-test/student-test/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { studentTestId: number };
type Return = StudentTestType | null;

export type GetStudentTestByIdResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const test = new StudentTest(args.studentTestId);
  return await test.get();
};

export const getStudentTestByIdResolver: GetStudentTestByIdResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
