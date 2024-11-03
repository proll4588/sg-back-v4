import { prisma } from '../controllers/prisma.controller.js';
import csv from 'csv-parser';
import fs from 'fs';

const main = async () => {
  const results: any[] = [];

  fs.createReadStream('./dist/scripts/data.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) =>
      results.push({
        employeeTestVariantId: Number(data.employeeTestVariantId) as number,
        employeeTestBlockId: Number(data.employeeTestBlockId) as number,
        title: data.title as string,
        position: Number(data.position) as number,
      })
    )
    .on('end', () => {
      console.log(results);

      prisma.employeeTestQuestion
        .createMany({ data: results })
        .then(() => console.log('done'));
    });
};

main();
