import { prisma } from '../../controllers/prisma.controller.js';
import { Role } from '../../resolvers/role.js';
import { EMPLOYEE_DEF, EMPLOYEE_POSITION_DEF } from './constants.js';
import { User } from './User.js';

export class Employee {
  static async createEmployeePosition(title: string) {
    return await prisma.employeePosition.create({
      data: { title },
      select: EMPLOYEE_POSITION_DEF,
    });
  }

  static async getEmployeePositions() {
    return await prisma.employeePosition.findMany({
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

    return await prisma.employee.create({
      data: { email, name, positionId, userId: newUser.userId },
      select: EMPLOYEE_DEF,
    });
  }

  static async getEmployees() {
    return await prisma.employee.findMany({
      select: EMPLOYEE_DEF,
    });
  }

  id: number;
  constructor(id: number) {
    this.id = id;
  }

  async getEmployee() {
    return await prisma.employee.findUnique({
      where: { id: this.id },
      select: EMPLOYEE_DEF,
    });
  }

  async deleteEmployee() {
    return await prisma.employee.delete({
      where: { id: this.id },
    });
  }
}
