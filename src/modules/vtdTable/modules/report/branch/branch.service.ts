import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from 'src/modules/vtdTable/vtdTable.service';

import { Branch } from './models/branch.model';

@Injectable()
export class BranchService extends VtdTableService {
  constructor(@InjectModel(Branch) readonly branchModel: typeof Branch) {
    super(branchModel);
  }
}
