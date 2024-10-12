import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const TYPE_DEFS_PATH = [
    resolve(__dirname, '../', 'schema.graphql'),
    //   '../schema.graphql',
    // './models/TestOne/schema.graphql',
    // './models/TestTwo/schema.graphql',
    // './models/User/schema.graphql',
];
