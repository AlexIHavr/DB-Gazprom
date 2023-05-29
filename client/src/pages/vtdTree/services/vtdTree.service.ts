import { vtdApi } from 'shared/api/api';

import { Vtd, Vtds } from '../types/vtds';
import { VtdTreeNames } from '../types/vtdTree';

class VtdService {
  async getAll() {
    const { data } = await vtdApi.get<Vtds>('/getAll');
    return data;
  }

  async deleteOneById(vtdId: string) {
    await vtdApi.delete('deleteOneById', { data: { vtdId } });
  }

  async createOne(vtdData: VtdTreeNames) {
    const { data } = await vtdApi.post<Vtd>('createOne', vtdData);
    return data;
  }
}

export default new VtdService();
