import { prisma } from '../controllers/prisma.controller.js';

const main = async () => {
  const processes = await prisma.employeeTestAnswer.findMany({
    where: {
      EmployeeTest: {
        employeeTestProcessId: 10,
      },
    },
    select: {
      answer: true,
      EmployeeTestQuestion: {
        select: {
          EmployeeTestBlock: {
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
    title: process.EmployeeTestQuestion.EmployeeTestBlock.title,
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

  console.log(avg);
};

main();
