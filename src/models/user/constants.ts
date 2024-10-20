export const GROUP_DEF = {
  id: true,
  title: true,
};

export const STUDENT_DEF = {
  passbookNumber: true,
  name: true,
  Group: { select: GROUP_DEF },
};

export const ROLE_DEF = {
  id: true,
  title: true,
};

export const USER_DEF = {
  id: true,
  login: true,
  password: true,
  Role: { select: ROLE_DEF },
  Student: { select: STUDENT_DEF },
};

export const EMPLOYEE_POSITION_DEF = {
  id: true,
  title: true,
};

export const EMPLOYEE_DEF = {
  id: true,
  name: true,
  email: true,
  EmploeePosition: { select: EMPLOYEE_POSITION_DEF },
  User: { select: USER_DEF },
};
