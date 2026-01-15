import {
  DepositRequest,
  DepositFulfilled,
  DepositCanceled,
  RedeemRequest,
  RedeemRequestCanceled,
  RedeemFulfilled,
  MemberLocks,
} from '@nexusmutual/db-schema/model';
import { DataSource } from 'typeorm';

export const createService = (dataSource: DataSource) => {
  const getMemberTransactions = async (memberId: string) => {
    const depositRequests = await dataSource
      .getRepository(DepositRequest)
      .createQueryBuilder('depositRequest')
      .where('depositRequest.memberId = :memberId', { memberId })
      .getMany();

    const depositCanceleds = await dataSource
      .getRepository(DepositCanceled)
      .createQueryBuilder('depositCanceled')
      .where('depositCanceled.memberId = :memberId', { memberId })
      .getMany();

    const depositFulfilleds = await dataSource
      .getRepository(DepositFulfilled)
      .createQueryBuilder('depositFulfilled')
      .where('depositFulfilled.memberId = :memberId', { memberId })
      .getMany();

    const redeemRequests = await dataSource
      .getRepository(RedeemRequest)
      .createQueryBuilder('redeemRequest')
      .where('redeemRequest.memberId = :memberId', { memberId })
      .getMany();

    const redeemRequestCanceleds = await dataSource
      .getRepository(RedeemRequestCanceled)
      .createQueryBuilder('redeemRequestCanceled')
      .where('redeemRequestCanceled.memberId = :memberId', { memberId })
      .getMany();

    const redeemFulfilleds = await dataSource
      .getRepository(RedeemFulfilled)
      .createQueryBuilder('redeemFulfilled')
      .where('redeemFulfilled.memberId = :memberId', { memberId })
      .getMany();

    return {
      depositRequests,
      depositCanceleds,
      depositFulfilleds,
      redeemRequests,
      redeemRequestCanceleds,
      redeemFulfilleds,
    };
  };

  const getMemberLocks = async (memberId: string) => {
    const memberLocks = await dataSource
      .getRepository(MemberLocks)
      .createQueryBuilder('memberLocks')
      .where('memberLocks.memberId = :memberId', { memberId })
      .getMany();

    const locksWithPoints = memberLocks.map(lock => {
      const day = 24 * 60 * 60;
      const shareUnit = 10n ** 8n;
      const shareMultiplier = lock.shares / (shareUnit * 1000n);
      const earningRate = (Number(lock.period) / (day * 90)) * Number(shareMultiplier);
      const cappedEarningRate = Math.max(1, Math.min(earningRate, 8));
      const now = Math.floor(Date.now() / 1000);
      const start = Math.floor(lock.startTime.getTime() / 1000);
      const points = cappedEarningRate * (now - start);

      return {
        ...lock,
        points,
      };
    });

    return locksWithPoints;
  };

  return { getMemberTransactions, getMemberLocks };
};

export type Service = ReturnType<typeof createService>;
