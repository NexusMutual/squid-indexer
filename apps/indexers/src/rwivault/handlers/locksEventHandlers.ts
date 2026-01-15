import { EventHandler } from './types';
import * as LocksAbi from '@nexusmutual/db-schema/abi/Locks';
import { MemberLocks } from '@nexusmutual/db-schema/model';

export const locksEventHandlers: Map<string, EventHandler> = new Map([
  [
    LocksAbi.events.SharesLocked.topic,
    async (log, block, ctx) => {
      const { memberId, lockId, shares, topUpShares, period } =
        LocksAbi.events.SharesLocked.decode(log);

      let lock = await ctx.store.get(MemberLocks, lockId.toString());
      if (!lock) {
        lock = new MemberLocks({
          id: `${memberId}:${lockId}`,
          memberId,
          lockId,
          shares,
          startTime: new Date(block.header.timestamp),
          period,
          withdrawnAt: null,
        });
      } else {
        lock.shares = shares;
        lock.period = period;
      }

      await ctx.store.upsert(lock);
    },
  ],
  [
    LocksAbi.events.SharesWithdrawn.topic,
    async (log, block, ctx) => {
      const { memberId, lockId } = LocksAbi.events.SharesWithdrawn.decode(log);
      const lock = await ctx.store.get(MemberLocks, `${memberId}:${lockId}`);
      if (lock) {
        lock.withdrawnAt = new Date(block.header.timestamp);
        await ctx.store.upsert(lock);
      }
    },
  ],
]);
