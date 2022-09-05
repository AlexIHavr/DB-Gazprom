import ApiError from '../errors/ApiError';
import vtdModel from '../models/vtdModel';
import { GetPipelineTableParams, SetPipelineTableRequest } from '../types/vtdTypes';

class VtdService {
  async getVtdTree() {
    const vtdTree = await vtdModel.findAll({
      attributes: { exclude: ['pipelineData'] },
      order: [
        ['type', 'DESC'],
        ['pipeline', 'ASC'],
        ['section', 'ASC'],
        ['year', 'DESC'],
      ],
    });
    return vtdTree;
  }

  async getPipelineTable({ id, tableType }: GetPipelineTableParams) {
    const vtd = await vtdModel.findByPk(id);

    if (!vtd) throw ApiError.BadRequest('Vtd was not found.');

    return vtd.pipelineData[tableType];
  }

  async setPipelineTable({ id, pipelineTable, tableType }: SetPipelineTableRequest) {
    const vtd = await vtdModel.findByPk(id);

    if (!vtd) throw ApiError.BadRequest('Vtd was not found.');

    await vtd.update({ pipelineData: { ...vtd.pipelineData, [tableType]: pipelineTable } });

    return vtd;
  }
}

export default new VtdService();
