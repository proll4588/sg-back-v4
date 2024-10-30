import { EmployeeType, UserType } from '../user/type';

export type EmployeeTestVariantType = {
  id: number;
  title: string;
};

export type EmployeeTestProcessMemberType = {
  id: number;
  employeeTestProcessId: number;
  Emplouee: EmployeeType;
};

export type EmployeeTestProcessType = {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date | null;
  EmployeeTestVariant: EmployeeTestVariantType;
  EmplyeeProcessMembers: EmployeeTestProcessMemberType[];
  User: UserType;
  EmployeeTest: EmployeeTestType[];
};

export type EmployeeTestAnswerType = {
  id: number;
  answer: number;
  EmployeeTestQuestion: EmployeeTestQuestionType;
};

export type EmployeeTestQuestionType = {
  id: number;
  title: string;
  position: number;
};

export type EmployeeTestType = {
  id: number;
  startDate: Date;
  endDate: Date | null;
  Emplouee: EmployeeType;
  EmployeeTestAnswer: EmployeeTestAnswerType[];
  EmployeeTestVariant: EmployeeTestVariantType;
};

export interface CompleteEmployeeTestAnswer {
  questionId: number;
  ans: number;
}
