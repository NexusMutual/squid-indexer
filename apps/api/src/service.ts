import { Product, ProductType } from '@nexusmutual/db-schema/model';
import { DataSource } from 'typeorm';

export const createService = (dataSource: DataSource) => {
  const getProducts = async () => {
    const products = await dataSource
      .getRepository(Product)
      .createQueryBuilder('product')
      .orderBy('CAST(product.id AS INTEGER)', 'ASC')
      .getMany();
    return products;
  };

  const getProductTypes = async () => {
    const productTypes = await dataSource
      .getRepository(ProductType)
      .createQueryBuilder('productType')
      .orderBy('CAST(productType.id AS INTEGER)', 'ASC')
      .getMany();
    return productTypes;
  };

  return { getProducts, getProductTypes };
};

export type Service = ReturnType<typeof createService>;
