import { prisma } from '../../controllers/prisma.controller.js';
import csv from 'csv-parser';
import fs from 'fs';

interface ParsAllData {
  Период: string;
  ФИО: string;
  Процесс: string;
  Блок: string;
  Вопрос: string;
  Ответ: number;
}

const findAllProcessNames = (data: ParsAllData[]) => {
  return [...new Set(data.map((d) => d.Период))];
};

const findAllEmployeeNames = async (data: ParsAllData[]) => {
  const names = [...new Set(data.map((d) => d.ФИО))];
  const ans = await prisma.employee.findMany({
    where: { name: { in: names } },
    select: { id: true, name: true },
  });

  const transformed = ans.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.name] = curr.id;
    return acc;
  }, {});

  return transformed;
};

const findAllQuestions = async (data: ParsAllData[]) => {
  const q = [...new Set(data.map((d) => d.Вопрос))];

  const ans = await prisma.employeeTestQuestion.findMany({
    where: { title: { in: q } },
    select: { id: true, title: true },
  });

  return ans.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.title] = curr.id;
    return acc;
  }, {});
};

const findAllProcessVarianrs = async (data: ParsAllData[]) => {
  const p = [...new Set(data.map((d) => d.Процесс))];

  const ans = await prisma.employeeTestVariant.findMany({
    where: { title: { in: p } },
    select: { id: true, title: true },
  });

  return ans.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.title] = curr.id;
    return acc;
  }, {});
};

const getAllAnswersByProcessName = (
  data: ParsAllData[],
  processName: string
) => {
  return data.filter((d) => d.Период === processName);
};

const findAllAnswersByEmployeeName = (
  data: ParsAllData[],
  employeeName: string
) => {
  return data.filter((d) => d.ФИО === employeeName);
};

const main = async () => {
  const results: ParsAllData[] = [];

  fs.createReadStream('./dist/scripts/pars-all/data4.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) =>
      results.push({ ...data, Ответ: Number(data['Ответ']) })
    )
    .on('end', async () => {
      //   console.log(results);

      const processNames = findAllProcessNames(results);
      //   console.log(processNames);

      //   const employeeNames = await findAllEmployeeNames(results);
      //   console.log(employeeNames);

      //   const questions = await findAllQuestions(results);
      //   console.log(questions);

      //   const processVariants = await findAllProcessVarianrs(results);
      //   console.log(processVariants);

      for (const processName of processNames) {
        const answers = getAllAnswersByProcessName(results, processName);

        const employeeNames = await findAllEmployeeNames(answers);
        // console.log(employeeNames);

        const questions = await findAllQuestions(answers);
        // console.log(questions);

        /* Создаём процесс */
        const process = await prisma.employeeTestProcess.create({
          data: {
            title: processName,
            startDate: new Date(),
            endDate: new Date(),
            // Тут выбрать вариант процесса
            employeeTestVariantId: 4,
            startUserId: 41,
          },
        });

        /* Добавляем участников процесса */
        await prisma.employeeProcessMembers.createMany({
          data: Object.entries(employeeNames).map(([name, id]) => ({
            employeeTestProcessId: process.id,
            employeeId: id,
          })),
        });

        /* Создаём тесты на каждого сотрудника */
        for (const [name, id] of Object.entries(employeeNames)) {
          const test = await prisma.employeeTest.create({
            data: {
              employeeTestProcessId: process.id,
              employeeId: id,
              startDate: new Date(),
              endDate: new Date(),
              // Тут выбрать вариант процесса
              employeeTestVariantId: 4,
            },
          });

          /* Отвечаем на вопросы */
          const employeeAnswers = findAllAnswersByEmployeeName(answers, name);
          for (const answer of employeeAnswers) {
            await prisma.employeeTestAnswer.create({
              data: {
                employeeTestId: test.id,
                questionId: questions[answer.Вопрос],
                answer: answer.Ответ,
              },
            });
          }
        }
      }

      console.log('done');
    });
};

main();
