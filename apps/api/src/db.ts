import { createDataSource, DataSourceOptions } from '@nexusmutual/db-schema';
import { DataSource } from 'typeorm';

import config from './config';

export const getDataSource = async (): Promise<DataSource> => {
  const dbOptions: DataSourceOptions = {
    type: 'postgres',
    host: config.get('db_host'),
    port: config.get('db_port'),
    database: config.get('db_name'),
    username: config.get('db_username'),
    password: config.get('db_password'),
  };

  return createDataSource(dbOptions);
};
