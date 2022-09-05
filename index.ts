import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import './config/config.ts';

import sequelizeRepository from './repositories/sequelizeRepository';
import baseRouter from './routers/baseRouter';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(helmet());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use('/api', baseRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  await sequelizeRepository.connect();
  console.log(`Server has been started on port ${process.env.PORT} ...`);
});
