import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vtd } from './models/vtd.model';

@Injectable()
export class VtdService {
  constructor(@InjectModel(Vtd) private readonly vtdModel: typeof Vtd) {}

  getAll(): Promise<Vtd[]> {
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
}
