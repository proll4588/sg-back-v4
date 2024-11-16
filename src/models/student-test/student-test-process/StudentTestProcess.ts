import { prisma } from '../../../controllers/prisma.controller.js';
import {
  STUDENT_TEST_PROCESS_LIST_ITEM_DEF,
  STUDENT_TEST_VARIANT_DEF,
} from './constants.js';

export class StudentTestProcess {
  static async getAvailableStudentTestProcesses(studentPassbookNumber: number) {
    return await prisma.studentTestProcess.findMany({
      where: {
        dateEnd: null,
        StudentTestProcessMembers: {
          some: {
            passbookNumber: studentPassbookNumber,
          },
        },
      },
      select: {
        id: true,
        title: true,
        StudentTestVariant: {
          select: {
            id: true,
            title: true,
          },
        },
        StudentTest: {
          where: { passbookNumber: studentPassbookNumber },
          select: {
            id: true,
            dateStart: true,
            dateEnd: true,
          },
        },
      },
    });
  }

  static async getStudentTestVariants() {
    return await prisma.studentTestVariant.findMany({
      select: STUDENT_TEST_VARIANT_DEF,
    });
  }

  static async getStudentTestProcesses() {
    return await prisma.studentTestProcess.findMany({
      select: STUDENT_TEST_PROCESS_LIST_ITEM_DEF,
    });
  }

  static async startStudentTestProcess(
    userId: number,
    title: string,
    studentTestVariantId: number,
    studentPassbookNumbers: number[]
  ) {
    const process = await prisma.studentTestProcess.create({
      data: {
        title,
        dateStart: new Date(),
        studentTestVariantId,
        userId,
      },
    });

    await prisma.studentTestProcessMembers.createMany({
      data: studentPassbookNumbers.map((passbookNumber) => ({
        passbookNumber,
        studentTestProcessId: process.id,
      })),
    });
  }

  studentTestProcessId: number;
  constructor(studentTestProcessId: number) {
    this.studentTestProcessId = studentTestProcessId;
  }

  // TODO: Надо протестить
  async getStudentTestProcessMembers() {
    return await prisma.student.findMany({
      where: {
        StudentTestProcessMembers: {
          some: { studentTestProcessId: this.studentTestProcessId },
        },
      },
      select: {
        passbookNumber: true,
        name: true,
        Group: { select: { title: true, id: true } },
        StudentTest: {
          where: { studentTestProcessId: this.studentTestProcessId },
          select: { id: true, dateStart: true, dateEnd: true },
        },
      },
    });
  }

  async finishStudentTestProcess() {
    return await prisma.studentTestProcess.update({
      where: { id: this.studentTestProcessId },
      data: { dateEnd: new Date() },
    });
  }
}
