import { Container } from '@needle-di/core';
import { Router } from 'express';

import { ServiceToken } from './types';

export const createRouter = (container: Container): Router => {
  const router = Router();
  const service = container.get(ServiceToken);

  router.get('/rwi-vault/member-transactions/:memberId', async (req, res) => {
    const memberId = req.params.memberId;
    const memberTransactions = await service.getMemberTransactions(memberId);
    res.json(memberTransactions);
  });

  router.get('/rwi-vault/member-locks/:memberId', async (req, res) => {
    const memberId = req.params.memberId;
    const memberLocks = await service.getMemberLocks(memberId);
    res.json(memberLocks);
  });

  return router;
};
