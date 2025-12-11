import 'dotenv/config';
import { inspect } from 'node:util';

import { handler } from './handlers';
import { processor } from './processor';
import { InjectableTypeormDatabase } from '../database';

const main = async () => {
  const db = new InjectableTypeormDatabase({ stateSchema: 'products_processor' });
  processor.run(db, handler);
};

main().catch(e => {
  console.log(`Error: ${inspect(e, true, 0)}`);
  process.exit(1);
});
