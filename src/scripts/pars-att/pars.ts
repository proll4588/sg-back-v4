import { prisma } from '../../controllers/prisma.controller.js';
import csv from 'csv-parser';
import fs from 'fs';

type Attestation = {
  Период: string;
  Регистратор: string;
  НомерСтроки: string;
  Активность: string;
  УчебныйПлан: string;
  ФормаОбучения: string;
  ПериодКонтроля: string;
  ВидКонтроля: string;
  ЗачетнаяКнига: number;
  Дисциплина: string;
  ФизическоеЛицо: string;
  ДатаЗанятияУдалить: string;
  ВремяНачалаУдалить: string;
  ВремяКонцаУдалить: string;
  ВидВедомости: string;
  ВидАттестации: string;
  Атт1: number;
  Атт2: number;
  Атт3: number;
  ПремБаллы: number;
  БаллыЗаЭкз: number;
  Итого: number;
  ТипВедомости: string;
  Номер: string;
};

const main = async () => {
  const results: Attestation[] = [];

  fs.createReadStream('./dist/scripts/pars-att/att.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => {
      results.push({
        ...data,
        Атт1: Number(data['Атт1']),
        Атт2: Number(data['Атт2']),
        Атт3: Number(data['Атт3']),
        ПремБаллы: Number(data['ПремБаллы']),
        БаллыЗаЭкз: Number(data['БаллыЗаЭкз']),
        Итого: Number(data['Итого']),
        ЗачетнаяКнига: Number(data['ЗачетнаяКнига']),
      });
    })
    .on('end', async () => {
      console.log(results.length);
      for (const result of results) {
        await prisma.studentAttestation.create({
          data: {
            att1: result.Атт1,
            att2: result.Атт2,
            att3: result.Атт3,
            extra: result.ПремБаллы,
            exam: result.БаллыЗаЭкз,
            controlPeriod: result.ПериодКонтроля,
            formOfStudy: result.ФормаОбучения,
            passbookNumber: result.ЗачетнаяКнига,
            priod: new Date(result.Период),
            courseTitle: result.Дисциплина,
            studentName: result.ФизическоеЛицо,
          },
        });
      }
    });
};

main();
