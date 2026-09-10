import appConfig from './app.js';
import s3Config from './s3.js';
import dbConfig from './db.cjs';

const config = {
  app: appConfig,
  db: dbConfig,
  storage: s3Config,
};

export default config;
