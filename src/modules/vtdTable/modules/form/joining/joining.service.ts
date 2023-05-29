import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from 'src/modules/vtdTable/vtdTable.service';

import { Joining } from './models/joining.model';

@Injectable()
export class JoiningService extends VtdTableService {
  constructor(@InjectModel(Joining) readonly joiningModel: typeof Joining) {
    super(joiningModel);
  }
}
