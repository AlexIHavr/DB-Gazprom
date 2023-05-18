import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdIdDto } from 'src/common/dto/vtdId.dto';
import { ServerError } from 'src/common/errors/serverError.error';
import { VtdTableService } from 'src/modules/vtdTable/vtdTable.service';
import { Character } from 'src/modules/vtdTable/modules/report/character/models/character.model';

import { Form } from './models/form.model';

@Injectable()
export class FormService extends VtdTableService {
  constructor(
    @InjectModel(Form) readonly formModel: typeof Form,
    @InjectModel(Character) readonly characterModel: typeof Character,
  ) {
    super(formModel);
  }

  async create({ vtdId }: VtdIdDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const characters = await this.characterModel.findAll({ where: { vtdId } });
    for (const character of characters) {
      await this.formModel.create(character.dataValues as Form);
    }
  }
}
