import { serverApi, vtdApi } from 'shared/api/api';

import { Vtds } from '../types/vtds';
import { CreateVtdTableParams } from '../types/params';
import { TableType, VtdTableResponse } from '../types/vtdTable';

class VtdTableService {
  async createAll({ vtdId, type, vtdTable }: CreateVtdTableParams) {
    const { data } = await serverApi.post(`${type}/createAll`, { vtdId, vtdTable });
    return data;
  }

  async getAll() {
    const { data } = await vtdApi.get<Vtds>('/getAll');
    return data;
  }

  async getAllByVtdId(vtdId: string, type: TableType) {
    const { data } = await serverApi.get<VtdTableResponse>(`${type}/getAllByVtdId`, { params: { vtdId } });
    return data;
  }
}

export default new VtdTableService();
