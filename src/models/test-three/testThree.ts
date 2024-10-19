import pdf from 'pdf-parse';
import { KEY_TEXT } from './keyText.js';
import { prisma } from '../../controllers/prisma.controller.js';
import { throwNewGQLError } from '../../GraphQLError/GraphQLError.js';
import { ServerExceptions } from '../../GraphQLError/type.js';
import { parsePdf } from './pars.js';

export const base64ToFile = (base64String: string) => {
  const base64Data = base64String.replace(/^data:.+;base64,/, '');

  var binaryString = atob(base64Data);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer as Buffer;
};

export class TestThree {
  static checkIsPdf(fileBase64: string) {
    return fileBase64.includes('data:application/pdf');
  }

  static async checkIsTest(file: Buffer) {
    const { text } = await pdf(file);

    return !KEY_TEXT.map((el) => text.includes(el.text)).some(
      (el) => el === false
    );
  }

  static async processPdf(userId: number, fileBase64: string) {
    /* Проверка на наличие результатов */
    const candidate = await prisma.testThreeProcess.findFirst({
      where: { userId },
    });

    if (candidate) throwNewGQLError(ServerExceptions.RESULTS_IS_ALREADY_EXIST);
    /* =============================== */

    /* Проверка на pdf */
    const isPdf = TestThree.checkIsPdf(fileBase64);
    if (!isPdf) throwNewGQLError(ServerExceptions.WRONG_PDF_FILE);
    /* =============== */

    const file = base64ToFile(fileBase64);

    /* Проверка на верный формат данных в pdf */
    const isTest = await TestThree.checkIsTest(file);
    if (!isTest) throwNewGQLError(ServerExceptions.WRONG_PDF_FILE);
    /* ====================================== */

    const res = await parsePdf(file);

    const process = await prisma.testThreeProcess.create({
      data: {
        date: new Date(),
        userId: userId,
      },
    });

    for (let i = 0; i < res.length; i++) {
      const item = res[i];
      await prisma.testThreeResult.create({
        data: {
          result: item.result,
          resultTitleId: item.id,
          processId: process.id,
        },
      });
    }
  }
}
