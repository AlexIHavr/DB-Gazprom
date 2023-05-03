import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/common/modules/vtdTable/vtdTable.controller';

import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController extends VtdTableController {
  constructor(readonly branchService: BranchService) {
    super(branchService);
  }
}
