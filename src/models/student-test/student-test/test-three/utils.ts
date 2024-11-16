import pdf from 'pdf-parse';
import { KEY_TEXT } from './keyText';

export const base64ToFile = (base64String: string) => {
  const base64Data = base64String.replace(/^data:.+;base64,/, '');

  var binaryString = atob(base64Data);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer as Buffer;
};
