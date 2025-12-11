import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from '@subsquid/typeorm-config/lib/namingStrategy';
import path from 'path';

export type { DataSourceOptions };

export const createDataSource = async (options: DataSourceOptions): Promise<DataSource> => {
  // locate models and migration
  const entities = options.entities ?? [require.resolve('./model')];
  const migrations = options.migrations ?? [path.resolve(__dirname, '../db/migrations/*.js')];
  const namingStrategy = options.namingStrategy ?? new SnakeNamingStrategy();

  const dataSource = new DataSource({
    ...options,
    entities,
    migrations,
    namingStrategy,
    migrationsRun: true,
    migrationsTransactionMode: 'all',
    logger: 'debug',
  });

  await dataSource.initialize();

  return dataSource;
};
