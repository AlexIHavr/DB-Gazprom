import { serverApi } from 'shared/api/api';

import { CreateAllParams } from '../types/params';
import { TableType } from '../types/tableType';
import { VtdTableResponse } from '../types/vtdTable';
import { CreateFormParams } from '../../vtdManager/types/params';

class VtdTableService {
  public async createAll({ vtdId, type, vtdTable }: CreateAllParams): Promise<void> {
    await serverApi.post(`${type}/createAll`, { vtdId, vtdTable });
  }

  public async getAllByVtdId(vtdId: string, type: TableType): Promise<VtdTableResponse> {
    const { data } = await serverApi.get<VtdTableResponse>(`${type}/getAllByVtdId`, {
      params: { vtdId },
    });
    return data;
  }

  public async deleteAllByVtdId(vtdId: string, type: TableType): Promise<void> {
    await serverApi.delete(`${type}/deleteAllByVtdId`, { data: { vtdId } });
  }

  public async createForm({ vtdId, startKm }: CreateFormParams): Promise<void> {
    await serverApi.post('form/create', { vtdId, startKm });
  }
}

export default new VtdTableService();
