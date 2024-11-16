import pdf from 'pdf-parse';
import { KEY_TEXT } from './keyText.js';

const findProc = (text: string, title: string) => {
  const addLength = title.length + 1;

  const index = text.indexOf(title) + addLength;

  let ans = '';
  for (let i = index; text[i] !== '%'; i++) {
    ans += text[i];
  }

  return Number(ans);
};

export const parsePdf = async (file: Buffer) => {
  const { text } = await pdf(file);

  const ans = KEY_TEXT.map((el) => {
    const ans = findProc(text, el.text);
    return {
      id: el.id,
      result: ans,
    };
  });

  return ans;
};
