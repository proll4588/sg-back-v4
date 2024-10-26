import { prisma } from '../../controllers/prisma.controller.js';
import {
  EMPLOYEE_TEST_PROCESS_DEF,
  EMPLOYEE_TEST_VARIANT_DEF,
} from './constants.js';

export class EmployeeTest {
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

    return EmployeeTest.getEmployeeTestProcess(employeeTestProcess.id);
  }

  id: number;
  constructor(id: number) {
    this.id = id;
  }

  async getData() {
    return EmployeeTest.getEmployeeTestProcess(this.id);
  }

  async finish() {
    await prisma.employeeTestProcess.update({
      where: { id: this.id },
      data: { endDate: new Date() },
    });

    return EmployeeTest.getEmployeeTestProcess(this.id);
  }
}
