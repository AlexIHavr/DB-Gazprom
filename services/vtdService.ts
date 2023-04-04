import ApiError from '../errors/ApiError';
import vtdModel from '../models/vtdModel';
import { GetPipelineTableParams, LoadPipelineTableRequest } from '../types/vtdTypes';

class VtdService {
  async getVtds() {
    const { type, pipeline, section, year, pipelineTables } = vtdModel.getAttributes();

    const vtds = await vtdModel.findAll({
      attributes: { exclude: [pipelineTables.field!] },
      order: [
        [type.field!, 'DESC'],
        [pipeline.field!, 'ASC'],
        [section.field!, 'ASC'],
        [year.field!, 'DESC'],
      ],
    });
    return vtds;
  }

  async getPipelineTable({ vtdId, type }: GetPipelineTableParams) {
    const vtd = await vtdModel.findByPk(vtdId);

    if (!vtd) throw ApiError.BadRequest('Vtd was not found.');

    return vtd.pipelineTables.find((pipelineTable) => pipelineTable.type === type);
  }

  async loadPipelineTable({ pipelineTable }: LoadPipelineTableRequest) {
    const vtd = await vtdModel.findByPk(pipelineTable.vtdId);

    if (!vtd) throw ApiError.BadRequest('Vtd was not found.');

    const currentPipelineTable = vtd.pipelineTables.find(({ type }) => pipelineTable.type === type);

    if (currentPipelineTable) throw ApiError.BadRequest('Vtd table already exists.');

    await vtd.update({ pipelineTables: [...vtd.pipelineTables, pipelineTable] });

    return vtd.pipelineTables;
  }
}

export default new VtdService();
