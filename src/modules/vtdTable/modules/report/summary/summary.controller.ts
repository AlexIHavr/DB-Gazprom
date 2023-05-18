import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/modules/vtdTable/vtdTable.controller';

import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController extends VtdTableController {
  constructor(readonly summaryService: SummaryService) {
    super(summaryService);
  }
}
