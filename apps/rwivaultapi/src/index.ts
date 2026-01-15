import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from 'express';
import { Container } from '@needle-di/core';

import config from './config';
import { getDataSource } from './db';
import { createRouter } from './router';
import { createService } from './service';
import { DataSourceToken, ServiceToken } from './types';
import './polyfills';

export const createApp = (container: Container): Express => {
  const app = express();
  app.use(express.json());

  const router = createRouter(container);
  app.use(router);

  app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};

const main = async () => {
  console.info('Connecting to database...');

  const dataSource = await getDataSource();
  const service = createService(dataSource);

  const container = new Container();
  container.bind({ provide: DataSourceToken, useValue: dataSource });
  container.bind({ provide: ServiceToken, useValue: service });

  const port = config.get('api_port');
  const app = createApp(container);

  app.listen(port, () => console.info(`API started on port ${port}`));
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});
