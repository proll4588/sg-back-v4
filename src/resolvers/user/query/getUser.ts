import { UserType } from '../../../models/user/type.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';
import { User } from '../../../models/user/user.js';
import { isAuthContext } from '../../../context/isAuthContext.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';

/* DEFINE */

type Args = {};
type Return = UserType | null;

export type GetUserResolverFun = ResolverFn<Args, Return>;

const ACCESS: Role[] = [];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async (context) => {
  // TODO: Мб переделать тип, передавать флаг что авторизирован и не
  // делать эти проверки
  if (isAuthContext(context)) return await User.getUserById(context.userId);
  else return null;
};

export const getUserResolver: GetUserResolverFun = async (...args) =>
  await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
