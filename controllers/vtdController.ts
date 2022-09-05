import { NextFunction, Request, Response } from 'express';

import vtdService from '../services/vtdService';
import { GetPipelineTableParams, SetPipelineTableRequest, VtdModel } from '../types/vtdTypes';

class VtdController {
  async getVtdTree(req: Request, res: Response<VtdModel[]>, next: NextFunction) {
    try {
      const vtdTree = await vtdService.getVtdTree();
      res.json(vtdTree);
    } catch (err) {
      next(err);
    }
  }

  async getPipelineTable(req: Request<{}, {}, {}, GetPipelineTableParams>, res: Response<{}>, next: NextFunction) {
    try {
      const pipelineTable = await vtdService.getPipelineTable(req.query);
      res.json(pipelineTable);
    } catch (err) {
      next(err);
    }
  }

  async setPipelineTable(req: Request<{}, {}, SetPipelineTableRequest>, res: Response<VtdModel>, next: NextFunction) {
    try {
      const vtd = await vtdService.setPipelineTable(req.body);
      res.json(vtd);
    } catch (err) {
      next(err);
    }
  }
}

export default new VtdController();
