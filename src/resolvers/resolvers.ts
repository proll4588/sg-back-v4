import { loginResolver } from './auth/mutation/login.js';
import { answerEmployeeTestResolver } from './employee-test/mutation/answerEmployeeTest.js';
import { createEmployeeTestProcessResolver } from './employee-test/mutation/createEmployeeTestProcess.js';
import { finishEmployeeTestResolver } from './employee-test/mutation/finishEmployeeTest.js';
import { finishEmployeeTestProcessResolver } from './employee-test/mutation/finishEmployeeTestProcess.js';
import { startEmployeeTestResolver } from './employee-test/mutation/startEmployeeTest.js';
import { getAvailableEmployeeTestProcessesResolver } from './employee-test/query/getAvailableEmployeeTestProcesses.js';
import { getEmployeeTestByIdResolver } from './employee-test/query/getEmployeeTestById.js';
import { getEmployeeTestByProcessIdResolver } from './employee-test/query/getEmployeeTestByProcessId.js';
import { getEmployeeTestProcessByIdResolver } from './employee-test/query/getEmployeeTestProcessById.js';
import { getEmployeeTestProcessesResolver } from './employee-test/query/getEmployeeTestProcesses.js';
import { getEmployeeTestProcessResultsResolver } from './employee-test/query/getEmployeeTestProcessResults.js';
import { getEmployeeTestQuestionsResolver } from './employee-test/query/getEmployeeTestQuestions.js';
import { getEmployeeTestVariantsResolver } from './employee-test/query/getEmployeeTestVariants.js';
import { answerStudentTestOneResolver } from './student-test/mutation/answerStudentTestOne.js';
import { answerStudentTestThreeResolver } from './student-test/mutation/answerStudentTestThree.js';
import { answerStudentTestTwoResolver } from './student-test/mutation/answerStudentTestTwo.js';
import { finishStudentTestProcessResolver } from './student-test/mutation/finishStudentTestProcess.js';
import { startStudentTestResolver } from './student-test/mutation/startStudentTest.js';
import { startStudentTestProcessResolver } from './student-test/mutation/startStudentTestProcess.js';
import { getAvailableStudentTestProcessesResolver } from './student-test/query/getAvailableStudentTestProcesses.js';
import { getStudentTestByIdResolver } from './student-test/query/getStudentTestById.js';
import { getStudentTestProcessesResolver } from './student-test/query/getStudentTestProcesses.js';
import { getStudentTestProcessMembersResolver } from './student-test/query/getStudentTestProcessMembers.js';
import { getStudentTestQuestionsResolver } from './student-test/query/getStudentTestQuestions.js';
import { getStudentTestVariantsResolver } from './student-test/query/getStudentTestVariants.js';
import { Resolvers } from './type.js';
import { createEmployeeResolver } from './user/mutation/createEmployee.js';
import { createEmployeePositionResolver } from './user/mutation/createEmployeePosition.js';
import { createStudentResolver } from './user/mutation/createStudent.js';
import { createStudentGroupResolver } from './user/mutation/createStudentGroup.js';
import { createUserResolver } from './user/mutation/createUser.js';
import { deleteEmployeeResolver } from './user/mutation/deleteEmployee.js';
import { deleteStudentResolver } from './user/mutation/deleteStudent.js';
import { deleteUserResolver } from './user/mutation/deleteUser.js';
import { getEmployeePositionsResolver } from './user/query/getEmployeePositions.js';
import { getEmployeesResolver } from './user/query/getEmployees.js';
import { getStudentGroupsResolver } from './user/query/getStudentGroups.js';
import { getStudentsResolver } from './user/query/getStudents.js';
import { getUserResolver } from './user/query/getUser.js';
import { getUsersResolver } from './user/query/getUsers.js';
import { getUsersRolesResolver } from './user/query/getUsersRoles.js';

export const resolvers: Resolvers = {
  Query: {
    /* User */
    getUser: getUserResolver,
    getUsers: getUsersResolver,
    getUsersRoles: getUsersRolesResolver,
    /* ==== */

    /* Student */
    getStudentGroups: getStudentGroupsResolver,
    getStudents: getStudentsResolver,
    /* ======= */

    /* Employee */
    getEmployeePositions: getEmployeePositionsResolver,
    getEmployees: getEmployeesResolver,
    /* ======== */

    /* Student test */
    getStudentTestVariants: getStudentTestVariantsResolver,
    getStudentTestProcesses: getStudentTestProcessesResolver,
    getStudentTestProcessMembers: getStudentTestProcessMembersResolver,
    getAvailableStudentTestProcesses: getAvailableStudentTestProcessesResolver,
    getStudentTestQuestions: getStudentTestQuestionsResolver,
    getStudentTestById: getStudentTestByIdResolver,
    /* ========= */

    /* Employee test */
    getEmployeeTestVariants: getEmployeeTestVariantsResolver,
    getEmployeeTestProcesses: getEmployeeTestProcessesResolver,
    getAvailableEmployeeTestProcesses:
      getAvailableEmployeeTestProcessesResolver,
    getEmployeeTestQuestions: getEmployeeTestQuestionsResolver,
    getEmployeeTestProcessById: getEmployeeTestProcessByIdResolver,
    getEmployeeTestByProcessId: getEmployeeTestByProcessIdResolver,
    getEmployeeTestById: getEmployeeTestByIdResolver,
    getEmployeeTestProcessResults: getEmployeeTestProcessResultsResolver,
    /* ========= */
  },
  Mutation: {
    /* Auth */
    login: loginResolver,
    /* ==== */

    /* User */
    deleteUser: deleteUserResolver,
    createUser: createUserResolver,
    /* ==== */

    /* Employee */
    createEmployeePosition: createEmployeePositionResolver,
    createEmployee: createEmployeeResolver,
    deleteEmployee: deleteEmployeeResolver,
    /* ==== */

    /* Student */
    createStudentGroup: createStudentGroupResolver,
    createStudent: createStudentResolver,
    deleteStudent: deleteStudentResolver,
    /* ==== */

    /* Student test */
    startStudentTestProcess: startStudentTestProcessResolver,
    finishStudentTestProcess: finishStudentTestProcessResolver,
    startStudentTest: startStudentTestResolver,
    answerStudentTestOne: answerStudentTestOneResolver,
    answerStudentTestTwo: answerStudentTestTwoResolver,
    answerStudentTestThree: answerStudentTestThreeResolver,
    /* ========= */

    /* Employee test */
    createEmployeeTestProcess: createEmployeeTestProcessResolver,
    finishEmployeeTestProcess: finishEmployeeTestProcessResolver,
    answerEmployeeTest: answerEmployeeTestResolver,
    finishEmployeeTest: finishEmployeeTestResolver,
    startEmployeeTest: startEmployeeTestResolver,
    /* ========= */
  },
};
