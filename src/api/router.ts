import { Router } from 'express';

import { Product, ProductType } from '@/model/generated';

import { dataSource } from './db';

export const getProducts = () => {
  return dataSource.getRepository(Product).find({
    order: { id: 'ASC' },
  });
};

export const getProductTypes = () => {
  return dataSource.getRepository(ProductType).find({
    order: { id: 'ASC' },
  });
};

export const createRouter = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('Hello World');
  });

  router.get('/products', async (req, res) => {
    const products = await getProducts();
    res.json(products);
  });

  router.get('/product-types', async (req, res) => {
    const productTypes = await getProductTypes();
    res.json(productTypes);
  });

  return router;
};
