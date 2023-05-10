import { serverApi } from 'shared/api/api';

import { CreateAllParams } from '../types/params';
import { TableType, VtdTableResponse } from '../types/vtdTable';

class VtdTableService {
  async createAll({ vtdId, type, vtdTable }: CreateAllParams) {
    const { data } = await serverApi.post(`${type}/createAll`, { vtdId, vtdTable });
    return data;
  }

  async getAllByVtdId(vtdId: string, type: TableType) {
    const { data } = await serverApi.get<VtdTableResponse>(`${type}/getAllByVtdId`, { params: { vtdId } });
    return data;
  }
}

export default new VtdTableService();
