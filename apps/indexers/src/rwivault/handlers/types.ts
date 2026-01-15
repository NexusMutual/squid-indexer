import { DataHandlerContext } from '@subsquid/evm-processor';
import type { BlockData, Log } from '@subsquid/evm-processor';
import { Store } from '@subsquid/typeorm-store';
import { Fields } from '../processor';

export type EventHandler = (
  log: Log,
  block: BlockData,
  ctx: DataHandlerContext<Store, Fields>,
) => Promise<void>;
