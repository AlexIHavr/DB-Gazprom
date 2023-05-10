import { vtdApi } from 'shared/api/api';

import { Vtds } from '../types/vtds';

class VtdService {
  async getAll() {
    const { data } = await vtdApi.get<Vtds>('/getAll');
    return data;
  }
}

export default new VtdService();
