import { readFileSync } from 'fs';
const getTypeDefByPath = (path) => {
    return readFileSync(path, {
        encoding: 'utf-8',
    });
};
export const getTypeDefs = (paths) => {
    return paths.map(getTypeDefByPath);
};
