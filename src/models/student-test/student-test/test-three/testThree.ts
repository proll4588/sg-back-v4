import pdf from 'pdf-parse';
import { KEY_TEXT } from './keyText.js';
import { prisma } from '../../../../controllers/prisma.controller.js';
import { ServerExceptions } from '../../../../GraphQLError/type.js';
import { throwNewGQLError } from '../../../../GraphQLError/GraphQLError.js';
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

  static async processPdf(studentTestId: number, fileBase64: string) {
    /* Проверка на наличие результатов */
    const test = await prisma.studentTest.findUnique({
      where: { id: studentTestId },
    });

    if (!test) {
      throwNewGQLError(ServerExceptions.WRONG_PDF_FILE);
      return;
    }

    const resultCandidate = await prisma.studentTestThreeResult.findMany({
      where: { studentTestId: test.id },
    });

    if (resultCandidate.length > 0)
      throwNewGQLError(ServerExceptions.RESULTS_IS_ALREADY_EXIST);

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

    for (let i = 0; i < res.length; i++) {
      const item = res[i];
      await prisma.studentTestThreeResult.create({
        data: {
          result: item.result,
          studentTestThreeResultTitleId: item.id,
          studentTestId: test.id,
        },
      });
    }
  }
}
