import { DataHandlerContext } from '@subsquid/evm-processor';
import { Store } from '@subsquid/typeorm-store';

import { RWIVAULT_ADDRESS, LOCKS_ADDRESS, Fields } from '../processor';
import { rwiVaultEventHandlers } from './vaultEventHanlders';
import { locksEventHandlers } from './locksEventHandlers';

export async function handler(ctx: DataHandlerContext<Store, Fields>) {
  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      if (log.address === RWIVAULT_ADDRESS) {
        const eventHandler = rwiVaultEventHandlers.get(log.topics[0]);
        if (eventHandler) {
          await eventHandler(log, block, ctx);
          continue;
        }
      }

      if (log.address === LOCKS_ADDRESS) {
        const eventHandler = locksEventHandlers.get(log.topics[0]);
        if (eventHandler) {
          await eventHandler(log, block, ctx);
          continue;
        }
      }
    }
  }
}
