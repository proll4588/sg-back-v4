import { Student } from '../../../models/user/Student.js';
import { StudentGroupType } from '../../../models/user/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = StudentGroupType[];

export type GetStudentGroupsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await Student.getStudentGroups();
};

export const getStudentGroupsResolver: GetStudentGroupsResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
