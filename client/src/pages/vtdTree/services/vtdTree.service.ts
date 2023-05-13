import { vtdApi } from 'shared/api/api';

import { Vtds } from '../types/vtds';

class VtdService {
  async getAll() {
    const { data } = await vtdApi.get<Vtds>('/getAll');
    return data;
  }

  async deleteOneById(vtdId: string) {
    await vtdApi.delete('deleteOneById', { data: { vtdId } });
  }

  async createOne(formData: FormData) {
    await vtdApi.post('createOne', formData);
  }
}

export default new VtdService();
