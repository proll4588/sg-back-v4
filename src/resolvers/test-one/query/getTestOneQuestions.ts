import { TestOne } from '../../../models/test-one/testOne.js';
import { TestOneQuestionsType } from '../../../models/test-one/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = TestOneQuestionsType[];

export type GetTestOneQuestionsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await TestOne.getTestOneQuestions();
};

export const getTestOneQuestionsResolver: GetTestOneQuestionsResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
