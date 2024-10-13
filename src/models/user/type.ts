// TODO: Выводить тип из Prisma
export interface UserType {
  id: number;
  login: string;
  password: string;
  Role: RoleType;
  Student: StudentType | null;
}

export interface RoleType {
  id: number;
  title: string;
}

export interface StudentType {
  passbookNumber: number;
  name: string;
  Group: {
    id: number;
    title: string;
  };
}
