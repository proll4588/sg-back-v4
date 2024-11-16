import { hashPassword } from '../../../auth/hashPassword.js';
import { Student } from '../../../models/user/Student.js';
import { StudentType } from '../../../models/user/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {
  passbookNumber: number;
  name: string;
  groupId: number;
  login: string;
  password: string;
};
type Return = StudentType;

export type CreateStudentResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Organizer];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (_, args) => {
  return await Student.createStudent(
    args.passbookNumber,
    args.name,
    args.groupId,
    args.login,
    hashPassword(args.password)
  );
};

export const createStudentResolver: CreateStudentResolverFun = async (
  ...args
) => await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
