import app from '#app';
import config from '#config/index.js';
import { connectDatabase } from '#database';

const startServer = async () => {
  try {
    await connectDatabase();
    console.log('Database connection established');

    app.listen(config.app.port, config.app.host, () => {
      console.log(`Backend is running at http://${config.app.host}:${config.app.port}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);
    process.exitCode = 1;
  }
};

startServer();
