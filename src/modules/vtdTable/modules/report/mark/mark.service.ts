import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from 'src/modules/vtdTable/vtdTable.service';

import { Mark } from './models/mark.model';

@Injectable()
export class MarkService extends VtdTableService {
  constructor(@InjectModel(Mark) readonly markModel: typeof Mark) {
    super(markModel);
  }
}
