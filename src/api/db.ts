import { BaseEntity, DataSource } from 'typeorm';

import config from '@/config';
import * as entities from '@/model/generated';

export let dataSource: DataSource;

export const setDataSource = (ds: DataSource) => {
  dataSource = ds;
};

export const createDataSource = async (): Promise<DataSource> => {
  dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: config.get('db_port'),
    database: config.get('db_name')!,
    username: 'postgres',
    password: 'postgres',
    entities: Object.values(entities),
  });

  await dataSource.initialize();
  BaseEntity.useDataSource(dataSource);

  return dataSource;
};
