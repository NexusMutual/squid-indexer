import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { abis } from '@nexusmutual/deployments';

// TODO: These may need to be versioned and added with different names!
//       When a contract event changes, we need to be able to index  old ones with old abi and new
//       ones with new abi. One option would be to can install deployments multiple times at fixed
//       versions with different npm aliases so we can import all of them at once.
//       For example:
//         npm install @nexusmutual/deployments-v2.3.0@npm:@nexusmutual/deployments@2.3.0 --save-exact
//       then:
//         const { CoverProducts: CoverProductsAt12345 } = require("@nexusmutual/deployments-v2.3.0")
//                                                 ^ deploy/upgrade block number

const main = async (): Promise<void> => {
  const contracts: Record<string, object> = {
    Cover: abis.Cover,
    CoverProducts: abis.CoverProducts,
    Registry: abis.Registry,
  };

  for (const [contract, abi] of Object.entries(contracts)) {
    const filePath = path.join(__dirname, '../..', 'abi', `${contract}.json`);
    await fs.writeFile(filePath, JSON.stringify(abi, null, 2));
  }
};

main()
  .then(() => process.exit(0))
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  });
