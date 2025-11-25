import { Container } from '@needle-di/core';
import { Router } from 'express';

import { ServiceToken } from './types';

export const createRouter = (container: Container): Router => {
  const router = Router();
  const service = container.get(ServiceToken);

  router.get('/products', async (_req, res) => {
    const products = await service.getProducts();
    res.json(products);
  });

  router.get('/product-types', async (_req, res) => {
    const productTypes = await service.getProductTypes();
    res.json(productTypes);
  });

  return router;
};
