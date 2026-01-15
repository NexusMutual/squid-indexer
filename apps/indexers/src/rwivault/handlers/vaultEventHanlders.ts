import { EventHandler } from './types';
import * as RWIVaultAbi from '@nexusmutual/db-schema/abi/RWIVault';
import {
  DepositRequest,
  DepositCanceled,
  DepositFulfilled,
  RedeemRequest,
  RedeemRequestCanceled,
  RedeemFulfilled,
} from '@nexusmutual/db-schema/model';

export const rwiVaultEventHandlers: Map<string, EventHandler> = new Map([
  [
    RWIVaultAbi.events.DepositRequest.topic,
    async (log, block, ctx) => {
      const { requestId, sender, assets } = RWIVaultAbi.events.DepositRequest.decode(log);
      await ctx.store.insert(
        new DepositRequest({
          id: requestId.toString(),
          sender,
          memberId: BigInt(0), // we don't have the memberId yet
          assets,
          timestamp: new Date(block.header.timestamp),
          blockNumber: block.header.height,
          txHash: log.transaction?.hash ?? '',
        }),
      );
    },
  ],
  [
    RWIVaultAbi.events.DepositRequestId.topic,
    async (log, block, ctx) => {
      const { requestId, memberId } = RWIVaultAbi.events.DepositRequestId.decode(log);
      const depositRequestId = await ctx.store.get(DepositRequest, requestId.toString());
      if (depositRequestId) {
        depositRequestId.memberId = memberId;
        await ctx.store.upsert(depositRequestId);
      }
    },
  ],

  [
    RWIVaultAbi.events.DepositRequestCanceled.topic,
    async (log, block, ctx) => {
      const { requestId, memberId, sender } = RWIVaultAbi.events.DepositRequestCanceled.decode(log);
      await ctx.store.insert(
        new DepositCanceled({
          id: requestId.toString(),
          sender,
          memberId,
          timestamp: new Date(block.header.timestamp),
          blockNumber: block.header.height,
          txHash: log.transaction?.hash ?? '',
        }),
      );
    },
  ],
  [
    RWIVaultAbi.events.DepositFulfilled.topic,
    async (log, block, ctx) => {
      const { requestId, memberId, memberAddress, assets, shares } =
        RWIVaultAbi.events.DepositFulfilled.decode(log);
      await ctx.store.insert(
        new DepositFulfilled({
          id: requestId.toString(),
          memberAddress,
          memberId,
          assets,
          shares,
          timestamp: new Date(block.header.timestamp),
          blockNumber: block.header.height,
          txHash: log.transaction?.hash ?? '',
        }),
      );
    },
  ],

  [
    RWIVaultAbi.events.RedeemRequest.topic,
    async (log, block, ctx) => {
      const { requestId, sender, shares } = RWIVaultAbi.events.RedeemRequest.decode(log);
      await ctx.store.insert(
        new RedeemRequest({
          id: requestId.toString(),
          sender,
          memberId: BigInt(0), // we don't have the memberId yet
          shares,
          timestamp: new Date(block.header.timestamp),
          blockNumber: block.header.height,
          txHash: log.transaction?.hash ?? '',
        }),
      );
    },
  ],

  [
    RWIVaultAbi.events.RedeemRequestId.topic,
    async (log, block, ctx) => {
      const { requestId, memberId } = RWIVaultAbi.events.RedeemRequestId.decode(log);
      const redeemRequestId = await ctx.store.get(RedeemRequest, requestId.toString());
      if (redeemRequestId) {
        redeemRequestId.memberId = memberId;
        await ctx.store.upsert(redeemRequestId);
      }
    },
  ],
  [
    RWIVaultAbi.events.RedeemRequestCanceled.topic,
    async (log, block, ctx) => {
      const { requestId, memberId, sender } = RWIVaultAbi.events.RedeemRequestCanceled.decode(log);
      await ctx.store.insert(
        new RedeemRequestCanceled({
          id: requestId.toString(),
          sender,
          memberId,
          timestamp: new Date(block.header.timestamp),
          blockNumber: block.header.height,
          txHash: log.transaction?.hash ?? '',
        }),
      );
    },
  ],

  [
    RWIVaultAbi.events.RedeemFulfilled.topic,
    async (log, block, ctx) => {
      const { requestId, memberId, memberAddress, assets, shares } =
        RWIVaultAbi.events.RedeemFulfilled.decode(log);
      await ctx.store.insert(
        new RedeemFulfilled({
          id: requestId.toString(),
          memberAddress,
          memberId,
          assets,
          shares,
          timestamp: new Date(block.header.timestamp),
          blockNumber: block.header.height,
          txHash: log.transaction?.hash ?? '',
        }),
      );
    },
  ],
]);
