import { NextFunction, Request, Response } from 'express';

import vtdService from '../services/vtdService';
import { GetPipelineTableParams, LoadPipelineTableRequest, PipelineTables, VtdModel } from '../types/vtdTypes';

class VtdController {
  async getVtds(req: Request, res: Response<VtdModel[]>, next: NextFunction) {
    try {
      const vtds = await vtdService.getVtds();
      res.json(vtds);
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

  async loadPipelineTable(req: Request<{}, {}, LoadPipelineTableRequest>, res: Response<PipelineTables>, next: NextFunction) {
    try {
      const pipelineTables = await vtdService.loadPipelineTable(req.body);
      res.json(pipelineTables);
    } catch (err) {
      next(err);
    }
  }
}

export default new VtdController();
