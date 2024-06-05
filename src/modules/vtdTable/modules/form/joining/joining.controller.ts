import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { JoiningService } from './joining.service';

@Controller('joining')
export class JoiningController extends VtdTableController {
  constructor(private readonly joiningService: JoiningService) {
    super(joiningService);
  }
}
