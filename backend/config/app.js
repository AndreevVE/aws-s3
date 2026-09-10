import 'dotenv/config';

const appConfig = {
  port: Number(process.env.PORT || 3333),
  host: process.env.HOST || '127.0.0.1',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default appConfig;
