import { createOrmConfig } from '@subsquid/typeorm-config';
import { setTimeout } from 'node:timers/promises';
import { DataSource } from 'typeorm';

const MAX_RETRIES = 20;
const RETRY_DELAY_MS = 500;

const main = async (): Promise<void> => {
  const connection = new DataSource({ ...createOrmConfig() });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connection.initialize();
      break;
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        console.log(`Failed to connect to the database after ${MAX_RETRIES} attempts: ${err}`);
        throw err;
      }
      console.log(`Retrying in ${RETRY_DELAY_MS}ms... (${attempt}/${MAX_RETRIES})`);
      await setTimeout(RETRY_DELAY_MS);
    }
  }

  console.log('Database connected successfully!');
};

main()
  .then(() => process.exit(0))
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  });
