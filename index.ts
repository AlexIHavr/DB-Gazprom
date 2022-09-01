import express from 'express';
import helmet from 'helmet';
import './config/config.ts';

import sequelizeRepository from './repositories/sequelizeRepository';

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(process.env.PORT, async () => {
  await sequelizeRepository.connect();
  console.log(`Server has been started on port ${process.env.PORT} ...`);
});
