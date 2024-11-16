import { StudentTestProcess } from '../../../models/student-test/student-test-process/StudentTestProcess.js';
import { StudentTestProcessListItemType } from '../../../models/student-test/student-test-process/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = StudentTestProcessListItemType[];

export type GetStudentTestProcessesResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await StudentTestProcess.getStudentTestProcesses();
};

export const getStudentTestProcessesResolver: GetStudentTestProcessesResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
