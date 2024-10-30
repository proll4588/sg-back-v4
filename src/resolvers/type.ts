import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../context/type.js';
import { GetUserResolverFun } from './user/query/getUser.js';
import { GetUsersResolverFun } from './user/query/getUsers.js';
import { GetUsersRolesResolverFun } from './user/query/getUsersRoles.js';
import { GetStudentsUsersResolverFun } from './user/query/getStudentUsers.js';
import { DeleteUserResolverFun } from './user/mutation/deleteUser.js';
import { CreateUserResolverFun } from './user/mutation/createUser.js';
import { LoginResolverFun } from './auth/mutation/login.js';
import { GetTestOneQuestionsResolverFun } from './test-one/query/getTestOneQuestions.js';
import { GetAllTestOneProcessResolverFun } from './test-one/query/getAllTestOneProcess.js';
import { GetTestOneProcessByUserIdResolverFun } from './test-one/query/getTestOneProcessByUserId.js';
import { GetTestOneResultsResolverFun } from './test-one/query/getTestOneResults.js';
import { StartTestOneResolverFun } from './test-one/mutation/startTestOne.js';
import { AnsTestOneResolverFun } from './test-one/mutation/ansTestOne.js';
import { CompleteTestOneResolverFun } from './test-one/mutation/completeTestOne.js';
import { GetAllTestTwoProcessResolverFun } from './test-two/query/getAllTestTwoProcess.js';
import { GetTestTwoQuestionsResolverFun } from './test-two/query/getTestTwoQuestions.js';
import { GetTestTwoProcessByUserIdResolverFun } from './test-two/query/getTestTwoProcessByUserId.js';
import { GetTestTwoResultsResolverFun } from './test-two/query/getTestTwoResults.js';
import { StartTestTwoResolverFun } from './test-two/mutation/startTestTwo.js';
import { AnsTestTwoResolverFun } from './test-two/mutation/ansTestTwo.js';
import { CompleteTestTwoResolverFun } from './test-two/mutation/completeTestTwo.js';
import { ProcessPdfResolverFun } from './test-three/mutation/processPdf.js';
import { GetEmployeePositionsResolverFun } from './user/query/getEmployeePositions.js';
import { GetEmployeesResolverFun } from './user/query/getEmployees.js';
import { CreateEmployeePositionResolverFun } from './user/mutation/createEmployeePosition.js';
import { CreateEmployeeResolverFun } from './user/mutation/createEmployee.js';
import { GetEmployeeTestVariantsResolverFun } from './employee-test/query/getEmployeeTestVariants.js';
import { GetEmployeeTestProcessesResolverFun } from './employee-test/query/getEmployeeTestProcesses.js';
import { CreateEmployeeTestProcessResolverFun } from './employee-test/mutation/createEmployeeTestProcess.js';
import { FinishEmployeeTestProcessResolverFun } from './employee-test/mutation/finishEmployeeTestProcess.js';
import { GetAvailableEmployeeTestProcessesResolverFun } from './employee-test/query/getAvailableEmployeeTestProcesses.js';
import { GetEmployeeTestQuestionsResolverFun } from './employee-test/query/getEmployeeTestQuestions.js';
import { AnswerEmployeeTestResolverFun } from './employee-test/mutation/answerEmployeeTest.js';
import { FinishEmployeeTestResolverFun } from './employee-test/mutation/finishEmployeeTest.js';
import { StartEmployeeTestResolverFun } from './employee-test/mutation/startEmployeeTest.js';
import { GetEmployeeTestProcessByIdResolverFun } from './employee-test/query/getEmployeeTestProcessById.js';
import { GetEmployeeTestByProcessIdResolverFun } from './employee-test/query/getEmployeeTestByProcessId.js';
import { GetEmployeeTestByIdResolverFun } from './employee-test/query/getEmployeeTestById.js';

export type ResolverFn<Args, ReturnType> = (
  parent: unknown,
  args: Args,
  context: ApolloContext,
  info: GraphQLResolveInfo
) => Promise<ReturnType> | ReturnType;

export interface Resolvers {
  Query: {
    /* User */
    getUser: GetUserResolverFun;
    getUsers: GetUsersResolverFun;
    getUsersRoles: GetUsersRolesResolverFun;
    getStudentUsers: GetStudentsUsersResolverFun;

    getEmployeePositions: GetEmployeePositionsResolverFun;
    getEmployees: GetEmployeesResolverFun;
    /* ==== */

    /* Test one */
    getTestOneQuestions: GetTestOneQuestionsResolverFun;
    getAllTestOneProcess: GetAllTestOneProcessResolverFun;
    getTestOneProcessByUserId: GetTestOneProcessByUserIdResolverFun;
    getTestOneResults: GetTestOneResultsResolverFun;
    /* ======== */

    /* Test two */
    getAllTestTwoProcess: GetAllTestTwoProcessResolverFun;
    getTestTwoQuestions: GetTestTwoQuestionsResolverFun;
    getTestTwoProcessByUserId: GetTestTwoProcessByUserIdResolverFun;
    getTestTwoResults: GetTestTwoResultsResolverFun;
    /* ======== */

    /* Employee test */
    getEmployeeTestVariants: GetEmployeeTestVariantsResolverFun;
    getEmployeeTestProcesses: GetEmployeeTestProcessesResolverFun;
    getEmployeeTestProcessById: GetEmployeeTestProcessByIdResolverFun;
    getAvailableEmployeeTestProcesses: GetAvailableEmployeeTestProcessesResolverFun;
    getEmployeeTestQuestions: GetEmployeeTestQuestionsResolverFun;
    getEmployeeTestByProcessId: GetEmployeeTestByProcessIdResolverFun;
    getEmployeeTestById: GetEmployeeTestByIdResolverFun;
    /* ========= */
  };
  Mutation: {
    /* User */
    deleteUser: DeleteUserResolverFun;
    createUser: CreateUserResolverFun;

    createEmployeePosition: CreateEmployeePositionResolverFun;
    createEmployee: CreateEmployeeResolverFun;
    /* ==== */

    /* Auth */
    login: LoginResolverFun;
    /* ==== */

    /* Test one */
    startTestOne: StartTestOneResolverFun;
    ansTestOne: AnsTestOneResolverFun;
    completeTestOne: CompleteTestOneResolverFun;
    /* ======== */

    /* Test two */
    startTestTwo: StartTestTwoResolverFun;
    ansTestTwo: AnsTestTwoResolverFun;
    completeTestTwo: CompleteTestTwoResolverFun;
    /* ======== */

    /* Test three */
    processPdf: ProcessPdfResolverFun;
    /* ========== */

    /* Employee test */
    createEmployeeTestProcess: CreateEmployeeTestProcessResolverFun;
    finishEmployeeTestProcess: FinishEmployeeTestProcessResolverFun;
    answerEmployeeTest: AnswerEmployeeTestResolverFun;
    finishEmployeeTest: FinishEmployeeTestResolverFun;
    startEmployeeTest: StartEmployeeTestResolverFun;
    /* ========= */
  };
}

export type ResolverCallbackFn<Args, ReturnType> = (
  context: ApolloContext,
  args: Args
) => ReturnType | Promise<ReturnType>;
