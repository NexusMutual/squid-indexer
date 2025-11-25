import * as CoverProductsAbi from '@nexusmutual/db-schema/abi/CoverProducts';
import { Multicall } from '@nexusmutual/db-schema/abi/multicall';
import { Product, ProductType } from '@nexusmutual/db-schema/model';
import { addresses } from '@nexusmutual/deployments';
import { DataHandlerContext } from '@subsquid/evm-processor';
import { Store } from '@subsquid/typeorm-store';

import { Fields } from '../processor';

const MULTICALL_ADDRESS = '0xeefba1e63905ef1d7acba5a8513c70307c1ce441';

type Block = DataHandlerContext<Store, Fields>['blocks'][0];

export async function handleInitialFetch(
  ctx: DataHandlerContext<Store, Fields>,
  block: Block,
  productTypes: Map<string, Partial<ProductType>>,
  products: Map<string, Partial<Product>>,
) {
  const height = block.header.height;
  const coverProducts = new CoverProductsAbi.Contract(ctx, { height }, addresses.CoverProducts);
  const multicall = new Multicall(ctx, { height }, MULTICALL_ADDRESS);

  const initialProductTypes = await coverProducts.getProductTypes();

  const productTypeNames = await multicall.aggregate(
    CoverProductsAbi.functions.getProductTypeName,
    addresses.CoverProducts,
    initialProductTypes.map((_, i) => ({ productTypeId: BigInt(i) })),
    100,
  );

  for (let productTypeId = 0; productTypeId < initialProductTypes.length; productTypeId++) {
    const initialProductType = initialProductTypes[productTypeId];

    const productType = new ProductType();
    productType.id = productTypeId.toString();
    productType.claimMethod = BigInt(initialProductType.claimMethod);
    productType.gracePeriod = BigInt(initialProductType.gracePeriod);
    productType.assessmentCooldownPeriod = BigInt(initialProductType.assessmentCooldownPeriod);
    productType.payoutRedemptionPeriod = BigInt(initialProductType.payoutRedemptionPeriod);
    productType.name = productTypeNames[productTypeId].trim();
    productType.metadata = ''; // will be updated in the next few blocks

    productTypes.set(productType.id, productType);
  }

  const initialProducts = await coverProducts.getProducts();

  const productNames = await multicall.aggregate(
    CoverProductsAbi.functions.getProductName,
    addresses.CoverProducts,
    initialProducts.map((_, i) => ({ productId: BigInt(i) })),
    100,
  );

  const allowedPools = await multicall.aggregate(
    CoverProductsAbi.functions.getAllowedPools,
    addresses.CoverProducts,
    initialProducts.map((_, i) => ({ productId: BigInt(i) })),
    100,
  );

  for (let productId = 0; productId < initialProducts.length; productId++) {
    const initialProduct = initialProducts[productId];

    const product = new Product();
    product.id = productId.toString();
    product.productType = BigInt(initialProduct.productType);
    product.minPrice = BigInt(initialProduct.minPrice);
    product.initialPriceRatio = BigInt(initialProduct.initialPriceRatio);
    product.coverAssets = BigInt(initialProduct.coverAssets);
    product.capacityReductionRatio = BigInt(initialProduct.capacityReductionRatio);
    product.isDeprecated = initialProduct.isDeprecated;
    product.useFixedPrice = initialProduct.useFixedPrice;
    product.name = productNames[productId].trim();
    product.metadata = ''; // will be updated in the next few blocks
    product.allowedPools = allowedPools[productId].map(pool => Number(pool));

    products.set(product.id, product);
  }
}
