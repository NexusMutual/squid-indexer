import * as CoverProductsAbi from '@/abi/CoverProducts';
import { ProductType } from '@/model';

const { setProductTypes } = CoverProductsAbi.functions;
const MAX_UINT256 = 2n ** 256n - 1n;

export async function handleSetProductTypes(
  input: string,
  productTypes: Map<string, Partial<ProductType>>,
  getNextProductTypeId: () => bigint,
) {
  const productTypeParams = setProductTypes.decode(input).productTypeParams;

  for (const param of productTypeParams) {
    const productType: Partial<ProductType> = {};

    productType.id = (param.productTypeId === MAX_UINT256 ? getNextProductTypeId() : param.productTypeId).toString();
    productType.name = param.productTypeName.trim();
    productType.claimMethod = BigInt(param.productType.claimMethod);
    productType.gracePeriod = BigInt(param.productType.gracePeriod);
    productType.assessmentCooldownPeriod = BigInt(param.productType.assessmentCooldownPeriod);
    productType.payoutRedemptionPeriod = BigInt(param.productType.payoutRedemptionPeriod);

    if (param.ipfsMetadata.length > 0) {
      productType.metadata = param.ipfsMetadata;
    }

    productTypes.set(productType.id, productType);
  }
}
