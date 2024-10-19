import { prisma } from '../../controllers/prisma.controller.js';
import {
  TEST_TWO_ANSWER_DEF,
  TEST_TWO_PROCESS_DEF,
  TEST_TWO_RESULT_DEF,
} from './constants.js';
import { KOM_MAP, ORG_MAP } from './resultMap.js';

export class TestTwo {
  static async getTestTwoQuestions() {
    return await prisma.testTwoQuestions.findMany();
  }

  static async getTestTwoProcessData(testTwoProcessId: number) {
    return await prisma.testTwoProcesses.findUnique({
      where: { id: testTwoProcessId },
      select: TEST_TWO_PROCESS_DEF,
    });
  }

  static async getTestTwoAllProcesses() {
    return await prisma.testTwoProcesses.findMany({
      select: TEST_TWO_PROCESS_DEF,
    });
  }

  static async getTestTwoByUserId(userId: number) {
    const data = await prisma.testTwoProcesses.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (data) return new TestTwo(data.id);
    else return null;
  }

  static async startTestTwo(userId: number) {
    return await prisma.testTwoProcesses.create({
      data: { startDate: new Date(), userId },
      select: TEST_TWO_PROCESS_DEF,
    });
  }

  static async getTestTwoResults() {
    return await prisma.testTwoResult.findMany({
      select: TEST_TWO_RESULT_DEF,
    });
  }

  testTwoProcessId: number;
  constructor(testTwoProcessId: number) {
    this.testTwoProcessId = testTwoProcessId;
  }

  async getData() {
    return await TestTwo.getTestTwoProcessData(this.testTwoProcessId);
  }

  async answer(questionId: number, answer: boolean) {
    const candidate = await prisma.testTwoAnswer.findFirst({
      where: { processId: this.testTwoProcessId, questionId },
    });

    if (candidate) {
      await prisma.testTwoAnswer.update({
        where: { id: candidate.id },
        data: { answer },
        select: TEST_TWO_ANSWER_DEF,
      });
    } else {
      await prisma.testTwoAnswer.create({
        data: { processId: this.testTwoProcessId, questionId, answer },
        select: TEST_TWO_ANSWER_DEF,
      });
    }
  }

  async complete() {
    await prisma.testTwoProcesses.update({
      where: { id: this.testTwoProcessId },
      data: { complete: true, endDate: new Date() },
      select: TEST_TWO_PROCESS_DEF,
    });

    await this.calculate();
  }

  private async calculate() {
    const ans = await prisma.testTwoAnswer.findMany({
      where: { processId: this.testTwoProcessId },
      include: {
        TestTwoQuestions: {
          select: { position: true },
        },
      },
    });

    //
    //
    //
    //
    //

    let col1 = 0;
    let col2 = 0;
    let col3 = 0;
    let col4 = 0;

    ans
      .sort((a, b) => a.TestTwoQuestions.position - b.TestTwoQuestions.position)
      .forEach((el, index) => {
        switch (index % 4) {
          case 0:
            if (el.answer) col1++;
            break;

          case 1:
            if (el.answer) col2++;
            break;

          case 2:
            if (!el.answer) col3++;
            break;

          case 3:
            if (!el.answer) col4++;
            break;
        }
      });

    //
    //
    //
    //
    //

    const Kx = col1 + col3;
    const Ox = col2 + col4;

    const kom = Kx / 20;
    const org = Ox / 20;

    const komRes =
      KOM_MAP.find((el) => el.start <= kom && kom <= el.end)?.value || 0;
    const orgRes =
      ORG_MAP.find((el) => el.start <= org && org <= el.end)?.value || 0;

    await prisma.testTwoResult.create({
      data: {
        kom,
        org,
        komResult: komRes,
        orgResult: orgRes,
        processId: this.testTwoProcessId,
      },
    });
  }
}
