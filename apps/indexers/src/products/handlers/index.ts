import { inspect } from 'node:util';

import * as CoverAbi from '@nexusmutual/db-schema/abi/Cover';
import * as CoverProductsAbi from '@nexusmutual/db-schema/abi/CoverProducts';
import { Product, ProductType } from '@nexusmutual/db-schema/model';
import { addresses } from '@nexusmutual/deployments';
import { DataHandlerContext } from '@subsquid/evm-processor';
import { Store } from '@subsquid/typeorm-store';
import { In } from 'typeorm';

import { Fields, V3_UPGRADE_BLOCK } from '../processor';
import { handleInitialFetch } from './initialFetch';
import { handleSetProductsMetadata, handleSetProductTypesMetadata } from './metadata';
import { handleSetProducts } from './setProducts';
import { handleSetProductTypes } from './setProductTypes';

const { setProducts, setProductsMetadata, setProductTypes, setProductTypesMetadata } =
  CoverProductsAbi.functions;

// wrapper for data fetching functions that caches and returns the same response every time
// there's no cache invalidation - the user is supposed to discard the instance, for example by
// defining this inside of a scope
const cachingFetcher = <T>(fetcherFn: () => Promise<T>): (() => Promise<T>) => {
  let result: Promise<T> | null = null;
  return async (): Promise<T> => (result ??= fetcherFn());
};

export async function handler(ctx: DataHandlerContext<Store, Fields>) {
  const products: Map<string, Partial<Product> & { id: string }> = new Map();
  const productTypes: Map<string, Partial<ProductType> & { id: string }> = new Map();

  let lastProductId: bigint = BigInt((await ctx.store.count(Product)) - 1); // ids start at zero
  const getNextProductId = () => ++lastProductId;

  let lastProductTypeId: bigint = BigInt((await ctx.store.count(ProductType)) - 1);
  const getNextProductTypeId = () => ++lastProductTypeId;

  for (const block of ctx.blocks) {
    const previousBlockHeight = { height: block.header.height - 1 };
    const cover = new CoverAbi.Contract(ctx, previousBlockHeight, addresses.Cover);
    const getDefaultMinPriceRatio = cachingFetcher(async () =>
      BigInt(await cover.DEFAULT_MIN_PRICE_RATIO()),
    );

    for (const transaction of block.transactions) {
      // initial fetch - can be bumped from time to time to a newer block since we don't need historical data
      if (transaction.block.height === V3_UPGRADE_BLOCK) {
        await handleInitialFetch(ctx, block, productTypes, products);
        continue;
      }

      ctx.log.warn(`Block ${block.header.height} included but not targeted?!`);
      throw new Error('stop');
    }

    for (const trace of block.traces) {
      if (trace.type !== 'call' || !trace.action?.input) {
        ctx.log.warn(`Skipping trace without action or input: ${inspect(trace, { depth: null })}`);
        continue;
      }

      const { input, sighash } = trace.action;

      // product types

      if (sighash === setProductTypes.sighash) {
        await handleSetProductTypes(input, productTypes, getNextProductTypeId);
      }

      if (sighash === setProductTypesMetadata.sighash) {
        await handleSetProductTypesMetadata(input, productTypes);
      }

      // products

      if (sighash === setProducts.sighash) {
        await handleSetProducts(input, products, getNextProductId, getDefaultMinPriceRatio);
      }

      if (sighash === setProductsMetadata.sighash) {
        await handleSetProductsMetadata(input, products);
      }
    }
  }

  // cannot do upsert with partial fields (db complains with not-null constraint violation)
  // we have to fetch the full entry from the db and update with new fields

  const dbProducts = await ctx.store.find(Product, {
    where: { id: In(Array.from(products.keys())) },
  });
  const dbProductMap = new Map(dbProducts.map(product => [product.id, product]));
  products.forEach(product =>
    products.set(product.id, { ...dbProductMap.get(product.id), ...product }),
  );

  const dbProductTypes = await ctx.store.find(ProductType, {
    where: { id: In(Array.from(productTypes.keys())) },
  });
  const dbProductTypeMap = new Map(
    dbProductTypes.map(productType => [productType.id, productType]),
  );
  productTypes.forEach(pt => productTypes.set(pt.id, { ...dbProductTypeMap.get(pt.id), ...pt }));

  await ctx.store.upsert(Array.from(products.values()).map(product => new Product(product)));
  await ctx.store.upsert(
    Array.from(productTypes.values()).map(productType => new ProductType(productType)),
  );
}
