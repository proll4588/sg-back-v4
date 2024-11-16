import { Student } from '../../../models/user/Student.js';
import { StudentGroupType } from '../../../models/user/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = { title: string };
type Return = StudentGroupType;

export type CreateStudentGroupResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return await Student.createStudentGroup(args.title);
};

export const createStudentGroupResolver: CreateStudentGroupResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
