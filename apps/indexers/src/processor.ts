import { DataHandlerContext, EvmBatchProcessor } from '@subsquid/evm-processor';
import { Attribute } from '@nexusmutual/db-schema';
import { TypeormDatabase, FieldSelection, Store } from '@subsquid/typeorm-store';

import config from './config';
import { getDataSource, InjectableTypeormDatabase } from './database';

const VNET_FORK_BLOCK = config.get('vnet_fork_block');

class VnetAwareProcessor<F extends FieldSelection = {}> extends EvmBatchProcessor<F> {
  override async run(
    database: InjectableTypeormDatabase | Database<Store>,
    handler: (ctx: DataHandlerContext<Store, F>) => Promise<void>,
  ): Promise<void> {
    super.run(database, handler);
  }
}

export async function createVnetAwareProcessor(): Promise<VnetAwareProcessor> {
  const db = await getDataSource();
  const flag = await db.getRepository(Attribute).findOneBy({ id: 'FORK_BLOCK_REACHED' });
  const forkBlockReached = flag && flag.value === 'true';

  const processor = new VnetAwareProcessor().setFinalityConfirmation(
    Number(config.get('finality_confirmation')),
  );

  if (!forkBlockReached) {
    processor.setGateway(config.get('gateway_url'));
  } else {
    processor.setRpcEndpoint({ url: config.get('provider_url')!, rateLimit: 20 });
  }

  return processor;
}
