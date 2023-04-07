import { vtdApi } from 'shared/api/api';

import { PipelineTable } from '../types/pipelineTable';

class PipelineTableService {
  async getPipelineTable(vtdId: string, type: string) {
    const { data } = await vtdApi.get<PipelineTable | undefined>('/getPipelineTable', { params: { vtdId, type } });
    return data;
  }
}

export default new PipelineTableService();
