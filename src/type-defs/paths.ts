import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TYPE_DEFS_PATH = [
  resolve(__dirname, '../', 'schema.graphql'),
  resolve(__dirname, '../', 'models', 'user', 'schema.graphql'),
  resolve(__dirname, '../', 'models', 'employee-test', 'schema.graphql'),
  resolve(
    __dirname,
    '../',
    'models',
    'student-test',
    'student-test-process',
    'schema.graphql'
  ),
  resolve(
    __dirname,
    '../',
    'models',
    'student-test',
    'student-test',
    'schema.graphql'
  ),
];
