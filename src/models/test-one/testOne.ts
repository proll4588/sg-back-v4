import { prisma } from '../../controllers/prisma.controller.js';
import { TEST_ONE_PROCESSES_DEF, TEST_ONE_RESULT_DEF } from './constants.js';
import { TEST_ONE_ANS_MAP } from './resultMaps.js';
import { TestOneProcessType } from './type.js';

export class TestOne {
  static async getTestOneQuestions() {
    return await prisma.testOneQuestions.findMany();
  }

  static async getTestOneByUserId(userId: number) {
    const data = await prisma.testOneProcesses.findFirst({
      where: { userId: userId },
      select: { id: true },
    });

    if (data) return new TestOne(data.id);
    else return null;
  }

  static async getTestOneByProcessId(testOneProcessId: number) {
    const data = await prisma.testOneProcesses.findUnique({
      where: { id: testOneProcessId },
      select: { id: true },
    });

    if (data) return new TestOne(data.id);
    else return null;
  }

  static async getTestOneData(testOneProcessId: number) {
    return await prisma.testOneProcesses.findUnique({
      where: { id: testOneProcessId },
      select: TEST_ONE_PROCESSES_DEF,
    });
  }

  static async createTestOneProcess(userId: number) {
    const newItem = await prisma.testOneProcesses.create({
      data: {
        startDate: new Date(),
        userId: userId,
      },
      select: { id: true },
    });

    return new TestOne(newItem.id);
  }

  static async getAllTestOne() {
    return await prisma.testOneProcesses.findMany({
      select: TEST_ONE_PROCESSES_DEF,
    });
  }

  static async getTestOneResults() {
    return await prisma.testOneResult.findMany({
      select: TEST_ONE_RESULT_DEF,
    });
  }

  testOneProcessId: number;
  constructor(testOneProcessId: number) {
    this.testOneProcessId = testOneProcessId;
  }

  async getData() {
    return await TestOne.getTestOneData(this.testOneProcessId);
  }

  async addAnswer(questionId: number, ans: number) {
    let candidate = await prisma.testOneAnswer.findFirst({
      where: {
        TestOneProcesses: { id: this.testOneProcessId },
        questionId: questionId,
      },
      select: { id: true },
    });

    if (candidate) {
      // Изменение старого ответа
      await prisma.testOneAnswer.update({
        where: { id: candidate.id },
        data: { answer: ans },
      });
    } else {
      // Новый ответ
      await prisma.testOneAnswer.create({
        data: {
          answer: ans,
          questionId: questionId,
          processId: this.testOneProcessId,
        },
      });
    }
  }

  async complete() {
    // TODO: Сделать проверку на ответы на все вопросы
    await prisma.testOneProcesses.update({
      where: { id: this.testOneProcessId },
      data: {
        complete: true,
        endDate: new Date(),
      },
      select: TEST_ONE_PROCESSES_DEF,
    });

    await this.calculateResult();
  }

  /* Расчёт результатов */
  private async calculateResult() {
    const test = await this.getData();
    if (test) this.createResultByProcess(test);
  }

  private async createResultByProcess(test: TestOneProcessType) {
    const result = await prisma.testOneResult.create({
      data: { testOneProcessId: test.id },
    });

    const res = this.calculateTestByScales(test);

    for (var i = 0; i < res.length; i++) {
      const el = res[i];

      await prisma.testOneResultItem.create({
        data: {
          result: el.res,
          scaleId: el.id,
          testOneResultId: result.id,
          testOneLevelId: this.getHeightOfAns(el.min, el.max, el.res),
        },
      });
    }
  }

  private calculateTestByScales(test: TestOneProcessType) {
    const testData = {
      ...test,
      TestOneAnswer: test.TestOneAnswer.reduce<number[]>((prev, cur) => {
        prev[cur.TestOneQuestions.position] = cur.answer;
        return prev;
      }, []),
    };

    const res = TEST_ONE_ANS_MAP.map((el) => {
      return {
        id: el.id,
        title: el.title,
        max: el.max,
        min: el.min,
        res: el.questions.reduce((prev, cur) => {
          const testAns = testData.TestOneAnswer[cur.position];
          const bal = cur.positive ? testAns : this.transparentAns(testAns);

          prev += bal;

          return prev;
        }, 0),
      };
    });

    return res;
  }

  private transparentAns(ans: number) {
    switch (ans) {
      case 1:
        return 7;
      case 2:
        return 6;
      case 3:
        return 5;
      case 4:
        return 4;
      case 5:
        return 3;
      case 6:
        return 2;
      case 7:
        return 1;

      default:
        return 0;
    }
  }

  private getHeightOfAns(min: number, max: number, res: number) {
    const localMax = max - min;
    const step = localMax / 3;
    const cof = res / step;

    if (cof <= 1) return 3;
    if (cof <= 2) return 2;
    return 1;
  }
}
