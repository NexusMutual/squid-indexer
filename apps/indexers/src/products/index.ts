import 'dotenv/config';

import { handler } from './handlers';
import { processor } from './processor';
import { InjectableTypeormDatabase } from '../database';

const db = new InjectableTypeormDatabase({ stateSchema: 'products_processor' });

processor.run(db, handler);
