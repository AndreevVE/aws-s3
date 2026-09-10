import express from 'express';
import cors from 'cors';
import v1Router from '#api/v1/router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1', v1Router);

export default app;
