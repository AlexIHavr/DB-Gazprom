import { serverApi } from 'shared/api/api';

import { CreateAllParams } from '../types/params';
import { TableType, VtdTableResponse } from '../types/vtdTable';

class VtdTableService {
  async createAll({ vtdId, type, vtdTable }: CreateAllParams) {
    await serverApi.post(`${type}/createAll`, { vtdId, vtdTable });
  }

  async getAllByVtdId(vtdId: string, type: TableType) {
    const { data } = await serverApi.get<VtdTableResponse>(`${type}/getAllByVtdId`, { params: { vtdId } });
    return data;
  }

  async deleteAllByVtdId(vtdId: string, type: TableType) {
    await serverApi.delete(`${type}/deleteAllByVtdId`, { data: { vtdId } });
  }
}

export default new VtdTableService();
