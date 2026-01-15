import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';

convict.addFormats(convictFormatWithValidator);

const config = convict({
  api_port: {
    doc: 'API port',
    format: 'port',
    default: 3000,
    env: 'API_PORT',
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
