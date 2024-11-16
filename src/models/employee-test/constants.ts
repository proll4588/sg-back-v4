import { EMPLOYEE_DEF, USER_DEF } from '../user/constants.js';

export const EMPLOYEE_TEST_VARIANT_DEF = {
  id: true,
  title: true,
};

export const SIMPLE_EMPLOYEE_TEST_BLOCK_DEF = {
  id: true,
  title: true,
  employeeTestVariantId: true,
};

export const EMPLOYEE_TEST_QUESTION_DEF = {
  id: true,
  title: true,
  position: true,
  EmployeeTestBlock: { select: SIMPLE_EMPLOYEE_TEST_BLOCK_DEF },
};

export const EMPLOYEE_TEST_PROCESS_MEMBER_DEF = {
  id: true,
  employeeTestProcessId: true,
  Employee: { select: EMPLOYEE_DEF },
};

export const EMPLOYEE_TEST_ANSWER_DEF = {
  id: true,
  answer: true,
  EmployeeTestQuestion: { select: EMPLOYEE_TEST_QUESTION_DEF },
};

export const EMPLOYEE_TEST_DEF = {
  id: true,
  startDate: true,
  endDate: true,
  Employee: { select: EMPLOYEE_DEF },
  EmployeeTestAnswer: { select: EMPLOYEE_TEST_ANSWER_DEF },
  EmployeeTestVariant: { select: EMPLOYEE_TEST_VARIANT_DEF },
};

export const EMPLOYEE_TEST_PROCESS_DEF = {
  id: true,
  title: true,
  startDate: true,
  endDate: true,
  EmployeeTestVariant: { select: EMPLOYEE_TEST_VARIANT_DEF },
  EmployeeProcessMembers: { select: EMPLOYEE_TEST_PROCESS_MEMBER_DEF },
  User: { select: USER_DEF },
  EmployeeTest: { select: EMPLOYEE_TEST_DEF },
};
