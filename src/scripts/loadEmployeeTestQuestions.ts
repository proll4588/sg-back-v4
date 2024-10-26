import { prisma } from '../controllers/prisma.controller.js';
import csv from 'csv-parser';
import fs from 'fs';

const main = async () => {
  const results: any[] = [];

  fs.createReadStream('./dist/scripts/data.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) =>
      results.push({
        title: data.question,
        employeeTestVariantId: Number(data.variantId),
      })
    )
    .on('end', () => {
      prisma.employeeTestQuestion
        .createMany({
          data: results,
        })
        .then(() => console.log('done'));
    });
};

main();
