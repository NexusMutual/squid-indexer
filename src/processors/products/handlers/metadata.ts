import * as CoverProductsAbi from '@/abi/CoverProducts';
import { Product, ProductType } from '@/model';

const { setProductsMetadata, setProductTypesMetadata } = CoverProductsAbi.functions;

export async function handleSetProductsMetadata(input: string, products: Map<string, Partial<Product>>) {
  const productIds = setProductsMetadata.decode(input).productIds;
  const ipfsMetadata = setProductsMetadata.decode(input).ipfsMetadata;

  for (let i = 0; i < productIds.length; i++) {
    const product = new Product({ id: productIds[i].toString(), metadata: ipfsMetadata[i] });
    products.set(product.id, product);
  }
}

export async function handleSetProductTypesMetadata(input: string, productTypes: Map<string, Partial<ProductType>>) {
  const productTypeIds = setProductTypesMetadata.decode(input).productTypeIds;
  const ipfsMetadata = setProductTypesMetadata.decode(input).ipfsMetadata;

  for (let i = 0; i < productTypeIds.length; i++) {
    const productType = new ProductType({ id: productTypeIds[i].toString(), metadata: ipfsMetadata[i] });
    productTypes.set(productType.id, productType);
  }
}
