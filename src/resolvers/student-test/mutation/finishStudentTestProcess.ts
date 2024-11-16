import { StudentTestProcess } from '../../../models/student-test/student-test-process/StudentTestProcess.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  studentTestProcessId: number;
};
type Return = boolean;

export type FinishStudentTestProcessResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  try {
    const process = new StudentTestProcess(args.studentTestProcessId);
    await process.finishStudentTestProcess();

    return true;
  } catch (error) {
    return false;
  }
};

export const finishStudentTestProcessResolver: FinishStudentTestProcessResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
