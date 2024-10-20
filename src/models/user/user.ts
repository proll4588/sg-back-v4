import { prisma } from '../../controllers/prisma.controller.js';
import { Role } from '../../resolvers/role.js';
import { EMPLOYEE_DEF, EMPLOYEE_POSITION_DEF, USER_DEF } from './constants.js';

export class User {
  /* Статические методы */

  // Сделать фильтры
  static async getAllUsers() {
    return await prisma.user.findMany({
      select: USER_DEF,
    });
  }

  static async getUserById(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: USER_DEF,
    });
  }

  // TODO: Можно использовать getAllUsers с фильтрами
  static async getUsersByRole(roleId: number) {
    return await prisma.user.findMany({
      where: { roleId: roleId },
      select: USER_DEF,
    });
  }

  static async createUser(login: string, password: string, roleId: number) {
    const data = await prisma.user.create({
      data: { login, password, roleId },
      select: { id: true },
    });

    return new User(data.id);
  }

  static async getUsersRoles() {
    return await prisma.role.findMany();
  }

  static async getUserByLogin(login: string) {
    const data = await prisma.user.findFirst({
      where: { login },
      select: { id: true },
    });

    if (data) return new User(data.id);
    else return null;
  }

  // TODO: Можно использовать getAllUsers с фильтрами
  static async getStudentUsers() {
    return await prisma.user.findMany({
      where: { Student: { isNot: null }, roleId: 2 },
      select: USER_DEF,
    });
  }

  static async getEmployeePositions() {
    return await prisma.emploeePosition.findMany({
      select: EMPLOYEE_POSITION_DEF,
    });
  }

  static async getEmployees() {
    return await prisma.emplouee.findMany({
      select: EMPLOYEE_DEF,
    });
  }

  static async createEmployeePosition(title: string) {
    return await prisma.emploeePosition.create({
      data: { title },
      select: EMPLOYEE_POSITION_DEF,
    });
  }

  static async createEmployee(
    login: string,
    password: string,
    positionId: number,
    name: string,
    email: string
  ) {
    const newUser = await User.createUser(login, password, Role.Employee);

    return await prisma.emplouee.create({
      data: { email, name, positionId, userId: newUser.userId },
      select: EMPLOYEE_DEF,
    });
  }

  /* ========================= */

  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  async getUserData() {
    return await User.getUserById(this.userId);
  }

  async deleteUser() {
    return await prisma.user.delete({
      where: { id: this.userId },
    });
  }
}
