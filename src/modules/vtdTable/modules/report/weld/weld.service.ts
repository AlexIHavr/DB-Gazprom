import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from '@vtdTable/vtdTable.service';

import { Weld } from './models/weld.model';

@Injectable()
export class WeldService extends VtdTableService {
  constructor(@InjectModel(Weld) private readonly weldModel: typeof Weld) {
    super(weldModel);
  }
}
