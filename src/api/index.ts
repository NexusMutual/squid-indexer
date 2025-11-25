import 'dotenv/config';
import express, { Express } from 'express';

import config from '@/config';

import { createDataSource } from './db';
import { createRouter } from './router';

export const createApp = (): Express => {
  const app = express();
  const router = createRouter();

  app.use(express.json());
  app.use(router);

  return app;
};

const main = async () => {
  console.info('Connecting to database...');

  await createDataSource();

  const port = config.get('api_port');
  const app = createApp();

  app.listen(port, () => console.info(`API started on port ${port}`));
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});
