import { prisma } from '../../../controllers/prisma.controller.js';
import { STUDENT_TEST_DEF, STUDENT_TEST_QUESTION_DEF } from './constants.js';
import { calcTestOneResult } from './test-one/calc.js';
import { TestThree } from './test-three/testThree.js';
import { calcTestTwoResult } from './test-two/calc.js';
import { StudentTestOneAnswerType, StudentTestTwoAnswerType } from './type.js';

export class StudentTest {
  static async getTestQuestions(studentTestId: number) {
    return await prisma.studentTestQuestion.findMany({
      where: {
        StudentTestVariant: {
          StudentTestProcess: {
            some: {
              StudentTest: {
                some: {
                  id: studentTestId,
                },
              },
            },
          },
        },
      },
      select: STUDENT_TEST_QUESTION_DEF,
    });
  }

  static async startStudentTest(
    studentPassbookNumber: number,
    studentTestProcessId: number
  ) {
    const process = await prisma.studentTestProcess.findUnique({
      where: { id: studentTestProcessId },
    });

    if (!process) return null;

    const test = await prisma.studentTest.create({
      data: {
        dateStart: new Date(),
        passbookNumber: studentPassbookNumber,
        studentTestProcessId: studentTestProcessId,
        studentTestVariantId: process.studentTestVariantId,
      },
    });

    return test;
  }

  static async finishStudentTestThree(
    studentTestId: number,
    fileBase64: string
  ) {
    await TestThree.processPdf(studentTestId, fileBase64);

    const test = new StudentTest(studentTestId);
    await test.finishStudentTest();
  }

  id: number;
  constructor(id: number) {
    this.id = id;
  }

  async finishStudentTestOne(answers: StudentTestOneAnswerType[]) {
    await prisma.studentTestOneAnswer.createMany({
      data: answers.map((answer) => ({
        studentTestId: this.id,
        studentTestQuestionId: answer.questionId,
        answer: answer.answer,
      })),
    });

    await this.finishStudentTest();
    await calcTestOneResult(this.id);
  }

  async finishStudentTestTwo(answers: StudentTestTwoAnswerType[]) {
    await prisma.studentTestTwoAnswer.createMany({
      data: answers.map((answer) => ({
        studentTestId: this.id,
        studentTestQuestionId: answer.questionId,
        answer: answer.answer,
      })),
    });

    await this.finishStudentTest();
    await calcTestTwoResult(this.id);
  }

  private async finishStudentTest() {
    await prisma.studentTest.update({
      where: { id: this.id },
      data: { dateEnd: new Date() },
    });
  }

  async get() {
    return await prisma.studentTest.findUnique({
      where: { id: this.id },
      select: STUDENT_TEST_DEF,
    });
  }
}
