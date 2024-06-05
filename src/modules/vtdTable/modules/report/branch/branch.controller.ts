import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController extends VtdTableController {
  constructor(private readonly branchService: BranchService) {
    super(branchService);
  }
}
