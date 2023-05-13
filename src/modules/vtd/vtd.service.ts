import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdIdDto } from 'src/common/dto/vtdId.dto';

import { Vtd } from './models/vtd.model';
import { ServerError } from 'src/common/errors/serverError.error';
import { CreateOneDto } from './dto/createOne.dto';

@Injectable()
export class VtdService {
  constructor(@InjectModel(Vtd) private readonly vtdModel: typeof Vtd) {}

  getAll() {
    const { type, pipeline, section, year } = this.vtdModel.getAttributes();

    return this.vtdModel.findAll({
      order: [
        [type.field!, 'DESC'],
        [pipeline.field!, 'ASC'],
        [section.field!, 'ASC'],
        [year.field!, 'DESC'],
      ],
    });
  }

  async createOne({ type, pipeline, section, year }: CreateOneDto) {
    const vtd = await this.vtdModel.findOne({ where: { type, pipeline, section, year } });
    if (vtd) throw ServerError.ExistsVtd();

    return this.vtdModel.create({ type, pipeline, section, year });
  }

  async deleteOneById({ vtdId }: VtdIdDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    return this.vtdModel.destroy({ where: { id: vtdId } });
  }
}
