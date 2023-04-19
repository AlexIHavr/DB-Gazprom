import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vtd } from './models/vtd.model';
import { CreateAllDto } from './types/dto';

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

  //on deleting
  async createAll({ vtds }: CreateAllDto) {
    for (const vtd of vtds) {
      await this.vtdModel.create(vtd);
    }
  }
}
