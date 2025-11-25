import convict from 'convict';

const config = convict({
  provider_url: {
    doc: 'The provider URL for blockchain access',
    format: 'url',
    default: null, // forcing the user to set it
    env: 'PROVIDER_URL',
    nullable: false,
  },
  gateway_url: {
    doc: 'Subsquid gateway (SQD Network data source) URL',
    format: 'url',
    default: 'https://v2.archive.subsquid.io/network/ethereum-mainnet',
    env: 'GATEWAY_URL',
  },
  finality_confirmation: {
    doc: 'Finality confirmation in blocks (number of blocks to wait after supposed finality)',
    format: 'nat',
    default: 25, // 25 blocks * 12 seconds/block = 300 seconds = 5 mins to finality
    env: 'FINALITY_CONFIRMATION',
  },
  db_name: {
    doc: 'Database name',
    format: String,
    default: null,
    env: 'DB_NAME',
    nullable: false,
  },
  db_port: {
    doc: 'Database port',
    format: 'port',
    default: 5432,
    env: 'DB_PORT',
  },
  api_port: {
    doc: 'API port',
    format: 'port',
    default: 3000,
    env: 'API_PORT',
  },
});

export default config.validate({ allowed: 'strict' });
