import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from 'src/modules/vtdTable/vtdTable.service';

import { Summary } from './models/summary.model';

@Injectable()
export class SummaryService extends VtdTableService {
  constructor(@InjectModel(Summary) readonly summaryModel: typeof Summary) {
    super(summaryModel);
  }
}
