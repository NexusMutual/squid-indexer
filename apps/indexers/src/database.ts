import assert from 'assert';
import { DataSource } from 'typeorm';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import { DatabaseState } from '@subsquid/typeorm-store/lib/interfaces';
import { createDataSource } from '@nexusmutual/db-schema';

import config from './config';

export const getDataSource = async (): Promise<DataSource> => {
  return createDataSource({
    type: 'postgres',
    host: config.get('db_host'),
    port: config.get('db_port'),
    database: config.get('db_name'),
    username: config.get('db_username'),
    password: config.get('db_password'),
  });
};

export class InjectableTypeormDatabase extends TypeormDatabase {
  private connected: boolean = false;

  override async connect(): Promise<DatabaseState> {
    assert(!this.connected, 'Database already connected');
    this.connected = true;

    const dataSource = await getDataSource();
    (this as any).con = dataSource;

    try {
      return await dataSource.transaction('SERIALIZABLE', (em: any) =>
        (this as any).initTransaction(em),
      );
    } catch (e: any) {
      await dataSource.destroy().catch(() => {}); // ignore error
      (this as any).con = undefined;
      throw e;
    }
  }
}
