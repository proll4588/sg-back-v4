import { loginResolver } from './auth/mutation/login.js';
import { ansTestOneResolver } from './test-one/mutation/ansTestOne.js';
import { completeTestOneResolver } from './test-one/mutation/completeTestOne.js';
import { startTestOneResolver } from './test-one/mutation/startTestOne.js';
import { getAllTestOneProcessResolver } from './test-one/query/getAllTestOneProcess.js';
import { getTestOneProcessByUserIdResolver } from './test-one/query/getTestOneProcessByUserId.js';
import { getTestOneQuestionsResolver } from './test-one/query/getTestOneQuestions.js';
import { getTestOneResultsResolver } from './test-one/query/getTestOneResults.js';
import { processPdfResolver } from './test-three/mutation/processPdf.js';
import { ansTestTwoResolver } from './test-two/mutation/ansTestTwo.js';
import { completeTestTwoResolver } from './test-two/mutation/completeTestTwo.js';
import { startTestTwoResolver } from './test-two/mutation/startTestTwo.js';
import { getAllTestTwoProcessResolver } from './test-two/query/getAllTestTwoProcess.js';
import { getTestTwoProcessByUserIdResolver } from './test-two/query/getTestTwoProcessByUserId.js';
import { getTestTwoQuestionsResolver } from './test-two/query/getTestTwoQuestions.js';
import { getTestTwoResultsResolver } from './test-two/query/getTestTwoResults.js';
import { Resolvers } from './type.js';
import { createUserResolver } from './user/mutation/createUser.js';
import { deleteUserResolver } from './user/mutation/deleteUser.js';
import { getStudentsUsersResolver } from './user/query/getStudentUsers.js';
import { getUserResolver } from './user/query/getUser.js';
import { getUsersResolver } from './user/query/getUsers.js';
import { getUsersRolesResolver } from './user/query/getUsersRoles.js';

export const resolvers: Resolvers = {
  Query: {
    /* User */
    getUser: getUserResolver,
    getUsers: getUsersResolver,
    getUsersRoles: getUsersRolesResolver,
    getStudentUsers: getStudentsUsersResolver,
    /* ==== */

    /* Test one */
    getAllTestOneProcess: getAllTestOneProcessResolver,
    getTestOneProcessByUserId: getTestOneProcessByUserIdResolver,
    getTestOneQuestions: getTestOneQuestionsResolver,
    getTestOneResults: getTestOneResultsResolver,
    /* ======== */

    /* Test two */
    getAllTestTwoProcess: getAllTestTwoProcessResolver,
    getTestTwoQuestions: getTestTwoQuestionsResolver,
    getTestTwoProcessByUserId: getTestTwoProcessByUserIdResolver,
    getTestTwoResults: getTestTwoResultsResolver,
    /* ======== */
  },
  Mutation: {
    /* User */
    deleteUser: deleteUserResolver,
    createUser: createUserResolver,
    /* ==== */

    /* Auth */
    login: loginResolver,
    /* ==== */

    /* Test one */
    startTestOne: startTestOneResolver,
    ansTestOne: ansTestOneResolver,
    completeTestOne: completeTestOneResolver,
    /* ======== */

    /* Test two */
    startTestTwo: startTestTwoResolver,
    ansTestTwo: ansTestTwoResolver,
    completeTestTwo: completeTestTwoResolver,
    /* ======== */

    /* Test three */
    processPdf: processPdfResolver,
    /* ========== */
  },
};
