import { isAuthContext } from '../../../context/isAuthContext.js';
import { StudentTestProcess } from '../../../models/student-test/student-test-process/StudentTestProcess.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  studentTestVariantId: number;
  title: string;
  studentPassbookNumbers: number[];
};
type Return = boolean;

export type StartStudentTestProcessResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context, args) => {
  if (!isAuthContext(context)) return false;

  try {
    await StudentTestProcess.startStudentTestProcess(
      context.userId,
      args.title,
      args.studentTestVariantId,
      args.studentPassbookNumbers
    );

    return true;
  } catch (error) {
    return false;
  }
};

export const startStudentTestProcessResolver: StartStudentTestProcessResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
