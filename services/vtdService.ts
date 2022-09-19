import ApiError from '../errors/ApiError';
import vtdModel from '../models/vtdModel';
import { GetPipelineTableParams, SetPipelineTableRequest } from '../types/vtdTypes';

class VtdService {
  async getVtds() {
    const { type, pipeline, section, year, pipelineData } = vtdModel.getAttributes();

    const vtds = await vtdModel.findAll({
      attributes: { exclude: [pipelineData.field!] },
      order: [
        [type.field!, 'DESC'],
        [pipeline.field!, 'ASC'],
        [section.field!, 'ASC'],
        [year.field!, 'DESC'],
      ],
    });
    return vtds;
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
