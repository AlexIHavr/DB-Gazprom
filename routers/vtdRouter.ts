import { Router } from 'express';

import vtdController from '../controllers/vtdController';

const vtdRouter = Router();

vtdRouter.get('/getVtds', vtdController.getVtds);
vtdRouter.get('/getPipelineTable', vtdController.getPipelineTable);

vtdRouter.put('/setPipelineTable', vtdController.setPipelineTable);

export default vtdRouter;