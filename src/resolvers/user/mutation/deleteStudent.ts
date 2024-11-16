import { Student } from '../../../models/user/Student.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { studentId: number };
type Return = boolean;

export type DeleteStudentResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const student = new Student(args.studentId);
  await student.deleteStudent();
  return true;
};

export const deleteStudentResolver: DeleteStudentResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
