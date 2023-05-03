import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from 'src/common/modules/vtdTable/vtdTable.service';

import { Weld } from './models/weld.model';

@Injectable()
export class WeldService extends VtdTableService {
  constructor(@InjectModel(Weld) readonly weldModel: typeof Weld) {
    super(weldModel);
  }
}
