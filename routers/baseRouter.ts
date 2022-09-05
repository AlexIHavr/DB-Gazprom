import { Router } from 'express';

import vtdRouter from './vtdRouter';

const baseRouter = Router();

baseRouter.use('/vtd', vtdRouter);

export default baseRouter;
