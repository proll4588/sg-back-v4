import { prisma } from '../../../../controllers/prisma.controller.js';
import { TEST_ONE_ANS_MAP } from './constants.js';

type ITest = {
  id: number;
  Student: {
    passbookNumber: number;
  };
  StudentTestOneAnswer: {
    id: number;
    answer: number;
    StudentTestQuestion: {
      position: number;
    };
  }[];
};

export const calcTestOneResult = async (studentTestId: number) => {
  const test = await getTestOneProcessById(studentTestId);
  if (!test) return;
  createResultByTest(test);
};

const createResultByTest = async (test: ITest) => {
  const result = await prisma.studentTestOneResult.create({
    data: { studentTestId: test.id },
  });

  const res = calculateTestByScales(test);

  for (var i = 0; i < res.length; i++) {
    const el = res[i];

    await prisma.studentTestOneResultItem.create({
      data: {
        result: el.res,
        studentTestOneScaleId: el.id,
        studentTestOneResultId: result.id,
        studentTestOneLevelId: getHeightOfAns(el.min, el.max, el.res),
      },
    });
  }
};

const calculateTestByScales = (test: ITest) => {
  const testData = {
    ...test,
    StudentTestOneAnswer: test.StudentTestOneAnswer.reduce<number[]>(
      (prev, cur) => {
        prev[cur.StudentTestQuestion.position] = cur.answer;
        return prev;
      },
      []
    ),
  };

  const res = TEST_ONE_ANS_MAP.map((el) => {
    return {
      id: el.id,
      title: el.title,
      max: el.max,
      min: el.min,
      res: el.questions.reduce((prev, cur) => {
        const testAns = testData.StudentTestOneAnswer[cur.position];
        const bal = cur.positive ? testAns : transparentAns(testAns);

        prev += bal;

        return prev;
      }, 0),
    };
  });

  return res;
};

const getTestOneProcessById = async (studentTestId: number) => {
  return await prisma.studentTest.findUnique({
    where: { id: studentTestId },
    select: {
      id: true,
      Student: { select: { passbookNumber: true } },
      StudentTestOneAnswer: {
        select: {
          id: true,
          answer: true,
          StudentTestQuestion: { select: { position: true } },
        },
      },
    },
  });
};

const transparentAns = (ans: number) => {
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
};

const getHeightOfAns = (min: number, max: number, res: number) => {
  const localMax = max - min;
  const step = localMax / 3;
  const cof = res / step;

  if (cof <= 1) return 3;
  if (cof <= 2) return 2;
  return 1;
};
