import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdIdDto } from 'common/dto/vtdId.dto';
import { ServerError } from 'common/errors/serverError.error';

import { Vtd } from './models/vtd.model';
import { CreateOneDto } from './dto/createOne.dto';

@Injectable()
export class VtdService {
  constructor(@InjectModel(Vtd) private readonly vtdModel: typeof Vtd) {}

  public getAll(): Promise<Vtd[]> {
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

  public async createOne({ type, pipeline, section, year }: CreateOneDto): Promise<Vtd> {
    const vtd = await this.vtdModel.findOne({ where: { type, pipeline, section, year } });

    if (vtd) throw ServerError.ExistsVtd();

    return this.vtdModel.create({ type, pipeline, section, year });
  }

  public async deleteOneById({ vtdId }: VtdIdDto): Promise<number> {
    const vtd = await this.vtdModel.findByPk(vtdId);

    if (!vtd) throw ServerError.NotFoundVtd();

    return this.vtdModel.destroy({ where: { id: vtdId } });
  }
}
