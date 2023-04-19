import { vtdApi } from 'shared/api/api';

import { PipelineTable } from '../types/pipelineTable';
import { Vtds } from '../types/vtds';

class VtdTableService {
  async getAll() {
    const { data } = await vtdApi.get<Vtds>('/getAll');
    return data;
  }

  async loadPipelineTable(pipelineTable: PipelineTable) {
    const { data } = await vtdApi.put('/loadPipelineTable', { pipelineTable });
    return data;
  }
}

export default new VtdTableService();
