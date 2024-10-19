import { TestTwo } from '../../../models/test-two/testTwo.js';
import { TestTwoQuestionsType } from '../../../models/test-two/type.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
import { ResolverCallbackFn, ResolverFn } from '../../type.js';

/* DEFINE */

type Args = {};
type Return = TestTwoQuestionsType[];

export type GetTestTwoQuestionsResolverFun = ResolverFn<Args, Return>;

const ACCESS = [Role.Admin, Role.Student];

/* Fn */

const resolver: ResolverCallbackFn<Args, Return> = async () => {
  return await TestTwo.getTestTwoQuestions();
};

export const getTestTwoQuestionsResolver: GetTestTwoQuestionsResolverFun =
  async (...args) =>
    await checkResolver<Args, Return>(...args)(ACCESS)(resolver);
