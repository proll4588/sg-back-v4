import { prisma } from '../../controllers/prisma.controller.js';
import {
  EMPLOYEE_TEST_PROCESS_DEF,
  EMPLOYEE_TEST_VARIANT_DEF,
} from './constants.js';

export class EmployeeTestProcess {
  static async getEmployeeTestVariants() {
    return await prisma.employeeTestVariant.findMany({
      select: EMPLOYEE_TEST_VARIANT_DEF,
    });
  }

  static async getEmployeeTestProcesses() {
    return await prisma.employeeTestProcess.findMany({
      select: EMPLOYEE_TEST_PROCESS_DEF,
    });
  }
  static async getEmployeeTestProcess(id: number) {
    return await prisma.employeeTestProcess.findUnique({
      where: { id },
      select: EMPLOYEE_TEST_PROCESS_DEF,
    });
  }

  static async createEmployeeTestProcess(data: {
    title: string;
    userId: number;
    testVariantId: number;
    employeeIds: number[];
  }) {
    const { title, testVariantId, employeeIds, userId } = data;

    const employeeTestProcess = await prisma.employeeTestProcess.create({
      data: {
        title,
        startDate: new Date(),
        startUserId: userId,
        employeeTestVariantId: testVariantId,
      },
    });

    await prisma.emplyeeProcessMembers.createMany({
      data: employeeIds.map((employeeId) => ({
        employeeId,
        employeeTestProcessId: employeeTestProcess.id,
      })),
    });

    return EmployeeTestProcess.getEmployeeTestProcess(employeeTestProcess.id);
  }

  static async getAvailableEmployeeTestProcesses(userId: number) {
    const employee = await prisma.emplouee.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!employee) return [];

    return await prisma.employeeTestProcess.findMany({
      where: {
        EmplyeeProcessMembers: { some: { employeeId: employee.id } },
        endDate: null,
      },
      select: {
        ...EMPLOYEE_TEST_PROCESS_DEF,
        EmployeeTest: {
          select: EMPLOYEE_TEST_PROCESS_DEF.EmployeeTest.select,
          where: { employeeId: employee.id },
        },
      },
    });
  }

  id: number;
  constructor(id: number) {
    this.id = id;
  }

  async getData() {
    return EmployeeTestProcess.getEmployeeTestProcess(this.id);
  }

  async finish() {
    await prisma.employeeTestProcess.update({
      where: { id: this.id },
      data: { endDate: new Date() },
    });

    return EmployeeTestProcess.getEmployeeTestProcess(this.id);
  }

  async getResults() {
    const processes = await prisma.employeeTestAnswer.findMany({
      where: {
        EmployeeTest: {
          employeeTestProcessId: this.id,
        },
      },
      select: {
        answer: true,
        EmployeeTestQuestion: {
          select: {
            EmployeeTestBlok: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    const parsed = processes.map((process) => ({
      answer: process.answer,
      title: process.EmployeeTestQuestion.EmployeeTestBlok.title,
    }));

    const calc = parsed.reduce<Record<string, number>>((acc, curr) => {
      if (curr.title in acc) {
        acc[curr.title] = (acc[curr.title] || 0) + Number(curr.answer);
      } else {
        acc[curr.title] = Number(curr.answer);
      }
      return acc;
    }, {});

    const avg = Object.entries(calc).map(([title, value]) => {
      const count = parsed.filter((p) => p.title === title).length;
      return { title, value: value / count };
    });

    return avg;
  }
}
