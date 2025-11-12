import { addresses } from '@nexusmutual/deployments';
import { EvmBatchProcessor, EvmBatchProcessorFields } from '@subsquid/evm-processor';

import * as CoverProductsAbi from './abi/CoverProducts';

const { PROVIDER_URL = '' } = process.env;
const GATEWAY_URL = 'https://v2.archive.subsquid.io/network/ethereum-mainnet';
const FINALITY_CONFIRMATION = 25; // 5 mins to finality

// https://etherscan.io/tx/0xabc5233ee1e5c020279152da74c9fe42e1db0491e5d3828678498bf907634ddf
const COVER_PRODUCTS_DEPLOY_BLOCK = 20383797;

const callSighash = [
  CoverProductsAbi.functions.setProducts,
  CoverProductsAbi.functions.setProductsMetadata,
  CoverProductsAbi.functions.setProductTypes,
  CoverProductsAbi.functions.setProductTypesMetadata,
].map(f => f.sighash);

export const processor = new EvmBatchProcessor()
  .setGateway(GATEWAY_URL)
  .setRpcEndpoint({ url: PROVIDER_URL, rateLimit: 10 })
  .setFinalityConfirmation(FINALITY_CONFIRMATION)
  .addTrace({
    type: ['call'],
    callTo: [addresses.CoverProducts],
    callSighash,
    range: { from: COVER_PRODUCTS_DEPLOY_BLOCK },
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
