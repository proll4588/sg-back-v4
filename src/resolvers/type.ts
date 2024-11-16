import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../context/type.js';
import { GetUserResolverFun } from './user/query/getUser.js';
import { GetUsersResolverFun } from './user/query/getUsers.js';
import { GetUsersRolesResolverFun } from './user/query/getUsersRoles.js';
import { DeleteUserResolverFun } from './user/mutation/deleteUser.js';
import { CreateUserResolverFun } from './user/mutation/createUser.js';
import { LoginResolverFun } from './auth/mutation/login.js';
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
import { GetEmployeeTestProcessResultsResolverFun } from './employee-test/query/getEmployeeTestProcessResults.js';
import { GetStudentGroupsResolverFun } from './user/query/getStudentGroups.js';
import { GetStudentsResolverFun } from './user/query/getStudents.js';
import { CreateStudentResolverFun } from './user/mutation/createStudent.js';
import { CreateStudentGroupResolverFun } from './user/mutation/createStudentGroup.js';
import { DeleteStudentResolverFun } from './user/mutation/deleteStudent.js';
import { DeleteEmployeeResolverFun } from './user/mutation/deleteEmployee.js';
import { GetAvailableStudentTestProcessesResolverFun } from './student-test/query/getAvailableStudentTestProcesses.js';
import { GetStudentTestProcessesResolverFun } from './student-test/query/getStudentTestProcesses.js';
import { GetStudentTestQuestionsResolverFun } from './student-test/query/getStudentTestQuestions.js';
import { GetStudentTestVariantsResolverFun } from './student-test/query/getStudentTestVariants.js';
import { GetStudentTestProcessMembersResolverFun } from './student-test/query/getStudentTestProcessMembers.js';
import { AnswerStudentTestOneResolverFun } from './student-test/mutation/answerStudentTestOne.js';
import { StartStudentTestProcessResolverFun } from './student-test/mutation/startStudentTestProcess.js';
import { AnswerStudentTestTwoResolverFun } from './student-test/mutation/answerStudentTestTwo.js';
import { StartStudentTestResolverFun } from './student-test/mutation/startStudentTest.js';
import { FinishStudentTestProcessResolverFun } from './student-test/mutation/finishStudentTestProcess.js';
import { AnswerStudentTestThreeResolverFun } from './student-test/mutation/answerStudentTestThree.js';
import { GetStudentTestByIdResolverFun } from './student-test/query/getStudentTestById.js';

export type ResolverFn<Args, ReturnType> = (
  parent: unknown,
  args: Args,
  context: ApolloContext,
  info: GraphQLResolveInfo
) => Promise<ReturnType> | ReturnType;

export interface Resolvers {
  Query: {
    /* User */
    getUsersRoles: GetUsersRolesResolverFun;
    getUsers: GetUsersResolverFun;
    getUser: GetUserResolverFun;
    /* ==== */

    /* Student */
    getStudentGroups: GetStudentGroupsResolverFun;
    getStudents: GetStudentsResolverFun;
    /* ==== */

    /* Employee */
    getEmployeePositions: GetEmployeePositionsResolverFun;
    getEmployees: GetEmployeesResolverFun;
    /* ==== */

    /* Student test */
    getStudentTestVariants: GetStudentTestVariantsResolverFun;
    getStudentTestProcesses: GetStudentTestProcessesResolverFun;
    getStudentTestProcessMembers: GetStudentTestProcessMembersResolverFun;
    getAvailableStudentTestProcesses: GetAvailableStudentTestProcessesResolverFun;
    getStudentTestQuestions: GetStudentTestQuestionsResolverFun;
    getStudentTestById: GetStudentTestByIdResolverFun;
    /* ========= */

    /* Employee test */
    getEmployeeTestVariants: GetEmployeeTestVariantsResolverFun;
    getEmployeeTestProcesses: GetEmployeeTestProcessesResolverFun;
    getEmployeeTestProcessById: GetEmployeeTestProcessByIdResolverFun;
    getAvailableEmployeeTestProcesses: GetAvailableEmployeeTestProcessesResolverFun;
    getEmployeeTestQuestions: GetEmployeeTestQuestionsResolverFun;
    getEmployeeTestByProcessId: GetEmployeeTestByProcessIdResolverFun;
    getEmployeeTestById: GetEmployeeTestByIdResolverFun;
    getEmployeeTestProcessResults: GetEmployeeTestProcessResultsResolverFun;
    /* ========= */
  };
  Mutation: {
    /* Auth */
    login: LoginResolverFun;
    /* ==== */

    /* User */
    deleteUser: DeleteUserResolverFun;
    createUser: CreateUserResolverFun;
    /* ==== */

    /* Student */
    createStudentGroup: CreateStudentGroupResolverFun;
    createStudent: CreateStudentResolverFun;
    deleteStudent: DeleteStudentResolverFun;
    /* ==== */

    /* Employee */
    createEmployeePosition: CreateEmployeePositionResolverFun;
    createEmployee: CreateEmployeeResolverFun;
    deleteEmployee: DeleteEmployeeResolverFun;
    /* ==== */

    /* Student test */
    startStudentTestProcess: StartStudentTestProcessResolverFun;
    finishStudentTestProcess: FinishStudentTestProcessResolverFun;
    startStudentTest: StartStudentTestResolverFun;
    answerStudentTestOne: AnswerStudentTestOneResolverFun;
    answerStudentTestTwo: AnswerStudentTestTwoResolverFun;
    answerStudentTestThree: AnswerStudentTestThreeResolverFun;
    /* ========= */

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
