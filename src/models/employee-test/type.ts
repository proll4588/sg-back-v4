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
};
