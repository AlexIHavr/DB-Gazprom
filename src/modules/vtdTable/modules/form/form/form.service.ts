import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ServerError } from 'common/errors/serverError.error';
import { VtdTableService } from '@vtdTable/vtdTable.service';
import { Character } from '@vtdTable/modules/report/character/models/character.model';
import { Anomaly } from '@vtdTable/modules/report/anomaly/models/anomaly.model';
import { Weld } from '@vtdTable/modules/report/weld/models/weld.model';

import { Form } from './models/form.model';
import { CreateDto } from './dto/create.dto';
import { getCreatedFormRows } from './helpers/getCreatedFormRows.helper';

@Injectable()
export class FormService extends VtdTableService {
  constructor(
    @InjectModel(Form) private readonly formModel: typeof Form,
    @InjectModel(Character) private readonly characterModel: typeof Character,
    @InjectModel(Anomaly) private readonly anomalyModel: typeof Anomaly,
    @InjectModel(Weld) private readonly weldModel: typeof Weld,
  ) {
    super(formModel);
  }

  public async create({ vtdId, startKm }: CreateDto): Promise<Form[]> {
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
