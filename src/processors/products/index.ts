import 'dotenv/config';
import { TypeormDatabase } from '@subsquid/typeorm-store';

import { handler } from './handlers';
import { processor } from './processor';

const db = new TypeormDatabase({ stateSchema: 'products_processor' });

processor.run(db, handler);
