import yargs from 'yargs/yargs';
import { handleShutdown } from './src/utils/handleShutdown.js';
import { DB } from './src/db/db.js';
import setupCli from './src/cli/index.js';

export const db = new DB();
await db.connect();

setupCli();

handleShutdown([
  async () => {
    await db.end();
  },
]);
