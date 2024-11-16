//  Студенты

export const STUDENT_GROUP_DEF = {
  id: true,
  title: true,
};

export const STUDENT_DEF = {
  passbookNumber: true,
  name: true,
  Group: { select: STUDENT_GROUP_DEF },
};

//  Пользователи

export const ROLE_DEF = {
  id: true,
  title: true,
};

export const USER_DEF = {
  id: true,
  login: true,
  password: true,
  Role: { select: ROLE_DEF },
};

//  Сотрудники

export const EMPLOYEE_POSITION_DEF = {
  id: true,
  title: true,
};

export const EMPLOYEE_DEF = {
  id: true,
  name: true,
  email: true,
  EmployeePosition: { select: EMPLOYEE_POSITION_DEF },
  User: { select: USER_DEF },
};
