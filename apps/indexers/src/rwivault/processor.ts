import { EvmBatchProcessor, EvmBatchProcessorFields } from '@subsquid/evm-processor';
import * as RWIVaultAbi from '@nexusmutual/db-schema/abi/RWIVault';
import * as LocksAbi from '@nexusmutual/db-schema/abi/Locks';
import config from '../config';

export const RWIVAULT_ADDRESS = '0xB688821ef950E2F6F82A257fFf8620b7d80FA3F1'.toLocaleLowerCase();
export const LOCKS_ADDRESS = '0x26c189A136C4D5D9a8E5e1219377a15A6440d892'.toLocaleLowerCase();

// vnet processor for testing
export const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
    url: config.get('provider_url')!,
    rateLimit: 10,
  })
  .setFinalityConfirmation(Number(config.get('finality_confirmation')))
  .setBlockRange({
    from: config.get('vnet_fork_block'),
  })
  .addLog({
    address: [RWIVAULT_ADDRESS, LOCKS_ADDRESS],
    // topic0: [
    //   RWIVaultAbi.events.RedeemFulfilled.topic,
    //   RWIVaultAbi.events.DepositFulfilled.topic,
    //   RWIVaultAbi.events.RedeemRequest.topic,
    //   RWIVaultAbi.events.DepositRequest.topic,
    //   RWIVaultAbi.events.RedeemRequestCanceled.topic,
    //   RWIVaultAbi.events.DepositRequestCanceled.topic,
    //   RWIVaultAbi.events.RedeemRequestId.topic,
    //   RWIVaultAbi.events.DepositRequestId.topic,
    //   LocksAbi.events.SharesLocked.topic,
    //   LocksAbi.events.SharesWithdrawn.topic,
    //   LocksAbi.events.MemberRewarded.topic,
    //   LocksAbi.events.RewardsAdded.topic,
    // ],
    transaction: true,
  })
  .setFields({
    log: {
      topics: true,
      data: true,
      transactionHash: true,
    },
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
