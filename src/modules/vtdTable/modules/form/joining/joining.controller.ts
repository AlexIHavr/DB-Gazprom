import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/modules/vtdTable/vtdTable.controller';

import { JoiningService } from './joining.service';

@Controller('joining')
export class JoiningController extends VtdTableController {
  constructor(readonly joiningService: JoiningService) {
    super(joiningService);
  }
}
