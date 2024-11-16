import { StudentTestProcess } from '../../../models/student-test/student-test-process/StudentTestProcess.js';
import { StudentTestProcessMembersType } from '../../../models/student-test/student-test-process/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  studentTestProcessId: number;
};
type Return = StudentTestProcessMembersType[];

export type GetStudentTestProcessMembersResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  const process = new StudentTestProcess(args.studentTestProcessId);
  return await process.getStudentTestProcessMembers();
};

export const getStudentTestProcessMembersResolver: GetStudentTestProcessMembersResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
