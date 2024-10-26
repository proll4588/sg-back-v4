import { EMPLOYEE_DEF, USER_DEF } from '../user/constants.js';

export const EMPLOYEE_TEST_VARIANT_DEF = {
  id: true,
  title: true,
};

export const EMPLOYEE_TEST_PROCESS_MEMBER_DEF = {
  id: true,
  employeeTestProcessId: true,
  Emplouee: { select: EMPLOYEE_DEF },
};

export const EMPLOYEE_TEST_PROCESS_DEF = {
  id: true,
  title: true,
  startDate: true,
  endDate: true,
  EmployeeTestVariant: { select: EMPLOYEE_TEST_VARIANT_DEF },
  EmplyeeProcessMembers: { select: EMPLOYEE_TEST_PROCESS_MEMBER_DEF },
  User: { select: USER_DEF },
};
