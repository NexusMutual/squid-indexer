import * as CoverProductsAbi from '@/abi/CoverProducts';
import { Product } from '@/model';

const { setProducts } = CoverProductsAbi.functions;
const MAX_UINT256 = 2n ** 256n - 1n;

export async function handleSetProducts(
  input: string,
  products: Map<string, Partial<Product>>,
  getNextProductId: () => bigint,
  defaultMinPriceRatio: () => Promise<bigint>,
) {
  const productParams = setProducts.decode(input).productParams;

  for (const param of productParams) {
    const product: Partial<Product> = {};
    const isNewProduct = param.productId === MAX_UINT256;

    // product type can only be set when creating the product, cannot be updated
    if (isNewProduct) {
      product.productType = BigInt(param.product.productType);
    }

    product.id = (isNewProduct ? getNextProductId() : param.productId).toString();
    product.name = param.productName.trim();
    product.minPrice = param.product.minPrice === 0 ? await defaultMinPriceRatio() : BigInt(param.product.minPrice);
    product.initialPriceRatio = BigInt(param.product.initialPriceRatio);
    product.coverAssets = BigInt(param.product.coverAssets);
    product.capacityReductionRatio = BigInt(param.product.capacityReductionRatio);
    product.isDeprecated = param.product.isDeprecated;
    product.useFixedPrice = param.product.useFixedPrice;
    product.allowedPools = param.allowedPools.map(pool => Number(pool));

    if (param.ipfsMetadata.length > 0) {
      product.metadata = param.ipfsMetadata;
    }

    products.set(product.id, product);
  }
}
