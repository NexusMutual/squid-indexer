import { inspect } from 'node:util';

import { addresses } from '@nexusmutual/deployments';
import { DataHandlerContext } from '@subsquid/evm-processor';
import { Store } from '@subsquid/typeorm-store';

import * as CoverAbi from './abi/Cover';
import * as CoverProductsAbi from './abi/CoverProducts';
import { Product, ProductType } from './model';
import { Fields } from './processor';

const { setProducts, setProductsMetadata, setProductTypes, setProductTypesMetadata } = CoverProductsAbi.functions;
const MAX_UINT256 = 2n ** 256n - 1n;

export async function handler(ctx: DataHandlerContext<Store, Fields>) {
  const products: Product[] = [];
  const productTypes: ProductType[] = [];

  let lastProductId: bigint = BigInt(await ctx.store.count(Product));
  ctx.log.info(`lastProductId: ${lastProductId}`);

  for (const block of ctx.blocks) {
    const height = { height: block.header.height - 1 };
    const cover = new CoverAbi.Contract(ctx, height, addresses.Cover);
    // const coverProducts = new CoverProductsAbi.Contract(ctx, height, addresses.CoverProducts);

    for (const trace of block.traces) {
      if (trace.type !== 'call' || !trace.action?.input) {
        ctx.log.debug(`Skipping trace: ${inspect(trace, { depth: null })}`);
        continue;
      }

      const { input, sighash } = trace.action;

      // TODO: track migrateCoverProducts calls and pull initial products from Cover contract
      //       will need the abi for the old Cover contract that had products in it at the time
      //       removal was here:
      // eslint-disable-next-line max-len
      // https://upgradehub.xyz/diffs/etherscan/0xcafead81a2c2508e7344155eB0DA67a3a487AA8d?selected=3#:~:text=function%20migrateCoverProducts()%20external%20%7B

      if (sighash === setProducts.sighash) {
        const productParams = setProducts.decode(input).productParams;
        ctx.log.debug(`Found ${productParams.length} productParams`);

        for (const param of productParams) {
          const product = new Product();
          const isNewProduct = param.productId === MAX_UINT256;

          product.id = (isNewProduct ? ++lastProductId : param.productId).toString();
          product.name = param.productName;

          if (isNewProduct) {
            // can only be set when creating the product, cannot be updated
            product.productType = BigInt(param.product.productType);
          }

          product.minPrice =
            param.product.minPrice === 0 ? await cover.DEFAULT_MIN_PRICE_RATIO() : BigInt(param.product.minPrice);

          product.initialPriceRatio = BigInt(param.product.initialPriceRatio);
          product.coverAssets = BigInt(param.product.coverAssets);
          product.capacityReductionRatio = BigInt(param.product.capacityReductionRatio);
          product.isDeprecated = param.product.isDeprecated;
          product.useFixedPrice = param.product.useFixedPrice;

          if (param.ipfsMetadata.length > 0) {
            product.metadata = param.ipfsMetadata;
          }

          ctx.log.debug(`Pushing product: ${inspect(product, { depth: null })}`);
          products.push(product);
        }
      }

      if (sighash === setProductTypes.sighash) {
        const productTypeParams = setProductTypes.decode(input).productTypeParams;
        ctx.log.debug(`Found ${productTypeParams.length} productTypes`);

        for (const param of productTypeParams) {
          const productType = new ProductType();

          // TODO: fix product type id
          // if (param.productTypeId == type(uint256).max) { uint productTypeId = _productTypes.length; }
          productType.id = param.productTypeId.toString();

          productType.name = param.productTypeName;
          productType.claimMethod = BigInt(param.productType.claimMethod);
          productType.gracePeriod = BigInt(param.productType.gracePeriod);
          productType.assessmentCooldownPeriod = BigInt(param.productType.assessmentCooldownPeriod);
          productType.payoutRedemptionPeriod = BigInt(param.productType.payoutRedemptionPeriod);

          if (param.ipfsMetadata.length > 0) {
            productType.metadata = param.ipfsMetadata[0];
          }

          ctx.log.debug(`productType: ${inspect(productType, { depth: null })}`);

          ctx.log.debug(`pushing productType: ${productType.id} ("${productType.name}")`);
          productTypes.push(productType);

          if (productTypes.length > 1) {
            throw new Error('stop');
          }
        }
      }

      if (sighash === setProductTypesMetadata.sighash || sighash === setProductsMetadata.sighash) {
        ctx.log.info('Skipping setProductsMetadata or setProductTypesMetadata');
        // throw new Error('stop');
      }
    }
  }

  await ctx.store.upsert(products);
  await ctx.store.upsert(productTypes);
}
