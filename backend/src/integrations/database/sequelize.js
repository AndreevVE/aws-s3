import { Sequelize } from 'sequelize';
import { format } from 'sql-formatter';
import config from '#config/index.js';

const env = config.app.nodeEnv;
const dbConfig = config.db[env] || config.db.development;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logQueryParameters: env === 'development',
    logging:
      env === 'development'
        ? (sql) => {
            const query = sql.replace(/^Executing \([^)]*\):\s*/, '');
            console.log(`\n${format(query, { language: 'mysql' })}\n`);
          }
        : false,
  },
);

export const connectDatabase = () => sequelize.authenticate();

export default sequelize;
