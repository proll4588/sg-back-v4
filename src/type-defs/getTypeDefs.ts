import { readFileSync } from 'fs';

const getTypeDefByPath = (path: string) => {
  return readFileSync(path, {
    encoding: 'utf-8',
  });
};
export const getTypeDefs = (paths: string[]) => {
  return paths.map(getTypeDefByPath);
};
