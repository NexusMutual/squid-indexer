import 'dotenv/config';

import { TypeormDatabase } from '@subsquid/typeorm-store';

import { handler } from './handler';
import { processor } from './processor';

const db = new TypeormDatabase();

processor.run(db, handler);
