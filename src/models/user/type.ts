// TODO: Выводить тип из Prisma
export interface UserType {
  id: number;
  login: string;
  password: string;
  Role: RoleType;
}

export interface RoleType {
  id: number;
  title: string;
}

// Студенты

export interface StudentType {
  passbookNumber: number;
  name: string;
  Group: StudentGroupType;
}

export interface StudentGroupType {
  id: number;
  title: string;
}

// Сотрудники

export interface EmployeePositionType {
  id: number;
  title: string;
}

export interface EmployeeType {
  id: number;
  User: UserType;
  EmployeePosition: EmployeePositionType;
  name: string;
  email: string;
}
