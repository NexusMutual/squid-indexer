import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';

convict.addFormats(convictFormatWithValidator);

const config = convict({
  provider_url: {
    doc: 'The provider URL for blockchain access',
    format: 'url',
    default: null,
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
    default: 25,
    env: 'FINALITY_CONFIRMATION',
  },
  db_host: {
    doc: 'Database host',
    format: String,
    default: 'localhost',
    env: 'DB_HOST',
  },
  db_port: {
    doc: 'Database port',
    format: 'port',
    default: 5432,
    env: 'DB_PORT',
  },
  db_name: {
    doc: 'Database name',
    format: String,
    default: 'postgres',
    env: 'DB_NAME',
  },
  db_username: {
    doc: 'Database username',
    format: String,
    default: 'postgres',
    env: 'DB_USERNAME',
  },
  db_password: {
    doc: 'Database password',
    format: String,
    default: 'postgres',
    env: 'DB_PASSWORD',
  },
});

export default config.validate({ allowed: 'strict' });
