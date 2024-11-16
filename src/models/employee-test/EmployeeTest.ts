import { prisma } from '../../controllers/prisma.controller.js';
import { EMPLOYEE_TEST_DEF, EMPLOYEE_TEST_QUESTION_DEF } from './constants.js';
import { EmployeeTestProcess } from './EmployeeTestProcess.js';
import { CompleteEmployeeTestAnswer } from './type.js';

export class EmployeeTest {
  static async getTestQuestions(testId: number) {
    const test = await prisma.employeeTest.findUnique({
      where: { id: testId },
      select: { employeeTestVariantId: true },
    });
    if (!test) return [];

    return await prisma.employeeTestQuestion.findMany({
      where: { employeeTestVariantId: test.employeeTestVariantId },
      select: EMPLOYEE_TEST_QUESTION_DEF,
    });
  }

  static async startTest(testProcessId: number, userId: number) {
    const testProcess = await EmployeeTestProcess.getEmployeeTestProcess(
      testProcessId
    );
    if (!testProcess) return null;

    const employee = await prisma.employee.findUnique({
      where: { userId },
    });
    if (!employee) return null;

    return await prisma.employeeTest.create({
      data: {
        employeeTestProcessId: testProcessId,
        employeeId: employee.id,
        startDate: new Date(),
        employeeTestVariantId: testProcess.EmployeeTestVariant.id,
      },
      select: EMPLOYEE_TEST_DEF,
    });
  }

  static async getEmployeeTestByProcessId(processId: number, userId: number) {
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return null;

    return await prisma.employeeTest.findMany({
      where: { employeeTestProcessId: processId, employeeId: employee.id },
      select: EMPLOYEE_TEST_DEF,
    });
  }

  static async getEmployeeTest(testId: number) {
    return await prisma.employeeTest.findUnique({
      where: { id: testId },
      select: EMPLOYEE_TEST_DEF,
    });
  }

  testId: number;
  constructor(testId: number) {
    this.testId = testId;
  }

  async getTest() {
    return await EmployeeTest.getEmployeeTest(this.testId);
  }

  async getTestQuestions() {
    return await EmployeeTest.getTestQuestions(this.testId);
  }

  async answerTestQuestion(answers: CompleteEmployeeTestAnswer[]) {
    await prisma.employeeTestAnswer.createMany({
      data: answers.map((answer) => ({
        answer: answer.ans,
        questionId: answer.questionId,
        employeeTestId: this.testId,
      })),
    });

    await this.finishTest();

    return this.getTest();
  }
  async finishTest() {
    return await prisma.employeeTest.update({
      where: { id: this.testId },
      data: { endDate: new Date() },
    });
  }
}
