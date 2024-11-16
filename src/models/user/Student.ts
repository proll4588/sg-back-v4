import { prisma } from '../../controllers/prisma.controller.js';
import { Role } from '../../resolvers/role.js';
import { STUDENT_GROUP_DEF, STUDENT_DEF } from './constants.js';
import { User } from './User.js';

export class Student {
  static async createStudent(
    passbookNumber: number,
    name: string,
    groupId: number,
    login: string,
    password: string
  ) {
    const user = await User.createUser(login, password, Role.Student);

    return await prisma.student.create({
      data: { passbookNumber, name, groupId, userId: user.userId },
      select: STUDENT_DEF,
    });
  }

  static async createStudentGroup(title: string) {
    return await prisma.group.create({
      data: { title },
      select: STUDENT_GROUP_DEF,
    });
  }

  static async getStudentGroups() {
    return await prisma.group.findMany({
      select: STUDENT_GROUP_DEF,
    });
  }

  static async getStudents() {
    return await prisma.student.findMany({
      select: STUDENT_DEF,
    });
  }

  static async getStudentByUserId(userId: number) {
    const student = await prisma.student.findFirst({
      where: { userId },
      select: { passbookNumber: true },
    });

    return student ? new Student(student.passbookNumber) : null;
  }

  passbookNumber: number;

  constructor(passbookNumber: number) {
    this.passbookNumber = passbookNumber;
  }

  async getStudent() {
    return await prisma.student.findUnique({
      where: { passbookNumber: this.passbookNumber },
      select: STUDENT_DEF,
    });
  }

  async deleteStudent() {
    return await prisma.student.delete({
      where: { passbookNumber: this.passbookNumber },
    });
  }
}
