import { vtdApi } from 'shared/api/api';

import { Vtd, Vtds } from '../types/vtds';
import { VtdTreeNames } from '../types/vtdTree';

class VtdService {
  public async getAll(): Promise<Vtds> {
    const { data } = await vtdApi.get<Vtds>('/getAll');
    return data;
  }

  public async deleteOneById(vtdId: string): Promise<void> {
    await vtdApi.delete('deleteOneById', { data: { vtdId } });
  }

  public async createOne(vtdData: VtdTreeNames): Promise<Vtd> {
    const { data } = await vtdApi.post<Vtd>('createOne', vtdData);
    return data;
  }
}

export default new VtdService();
