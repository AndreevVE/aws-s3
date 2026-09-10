require('dotenv').config();

const baseDbConfig = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
};

module.exports = {
  development: {
    ...baseDbConfig,
    database: process.env.DB_NAME || 'database_development',
  },
  test: {
    ...baseDbConfig,
    database: process.env.DB_NAME || 'database_test',
  },
  production: {
    ...baseDbConfig,
    database: process.env.DB_NAME || 'database_production',
  },
};
