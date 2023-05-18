import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from 'src/modules/vtdTable/vtdTable.service';

import { Tap } from './models/tap.model';

@Injectable()
export class TapService extends VtdTableService {
  constructor(@InjectModel(Tap) readonly tapModel: typeof Tap) {
    super(tapModel);
  }
}
