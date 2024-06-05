import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from '@vtdTable/vtdTable.service';

import { Anomaly } from './models/anomaly.model';

@Injectable()
export class AnomalyService extends VtdTableService {
  constructor(@InjectModel(Anomaly) private readonly anomalyModel: typeof Anomaly) {
    super(anomalyModel);
  }
}
