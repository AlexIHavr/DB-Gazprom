import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ServerError } from 'src/common/errors/serverError.error';
import { VtdTableService } from 'src/modules/vtdTable/vtdTable.service';
import { Character } from 'src/modules/vtdTable/modules/report/character/models/character.model';
import { Anomaly } from 'src/modules/vtdTable/modules/report/anomaly/models/anomaly.model';
import { Weld } from 'src/modules/vtdTable/modules/report/weld/models/weld.model';

import { Form } from './models/form.model';
import { CreateDto } from './dto/create.dto';
import { getCreatedFormRows } from './helpers/getCreatedFormRows';

@Injectable()
export class FormService extends VtdTableService {
  constructor(
    @InjectModel(Form) readonly formModel: typeof Form,
    @InjectModel(Character) readonly characterModel: typeof Character,
    @InjectModel(Anomaly) readonly anomalyModel: typeof Anomaly,
    @InjectModel(Weld) readonly weldModel: typeof Weld,
  ) {
    super(formModel);
  }

  async create({ vtdId, startKm }: CreateDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const createdFormRows = await getCreatedFormRows({
      vtdId,
      startKm,
      formModel: this.formModel,
      anomalyModel: this.anomalyModel,
      characterModel: this.characterModel,
      weldModel: this.weldModel,
    });

    return createdFormRows;
  }
}
