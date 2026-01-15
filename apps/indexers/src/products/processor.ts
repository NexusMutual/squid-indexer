import { functions as fn } from '@nexusmutual/db-schema/abi/CoverProducts';
import { addresses } from '@nexusmutual/deployments';
import { EvmBatchProcessor, EvmBatchProcessorFields } from '@subsquid/evm-processor';

import config from '../config';

export const V3_UPGRADE_BLOCK = 23689684;

const productSettersSighashes = [
  fn.setProducts.sighash,
  fn.setProductsMetadata.sighash,
  fn.setProductTypes.sighash,
  fn.setProductTypesMetadata.sighash,
];

export const processor = new EvmBatchProcessor()
  .setGateway(config.get('gateway_url'))
  .setRpcEndpoint({ url: config.get('provider_url')!, rateLimit: 20 })
  .setFinalityConfirmation(Number(config.get('finality_confirmation')))
  .addTransaction({
    // targetting v3 upgrade https://etherscan.io/tx/0xb4c6711872002b95e8269431e054a19146cd11b737a76b7408956201e1685169
    // used to fetch the products directly from the contract
    from: ['0x9063a2C78aFd6C8A3510273d646111Df67D6CB4b'], // AB member
    to: ['0x51ad1265C8702c9e96Ea61Fe4088C2e22eD4418e'], // AB multisig
    range: { from: V3_UPGRADE_BLOCK, to: V3_UPGRADE_BLOCK },
  })
  .addTrace({
    type: ['call'],
    callTo: [addresses.CoverProducts],
    callSighash: productSettersSighashes,
    range: { from: V3_UPGRADE_BLOCK },
  })
  .setFields({
    trace: {
      callTo: true,
      callInput: true,
      callResultOutput: true,
      callSighash: true,
      type: true,
      error: true,
      revertReason: true,
    },
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
