import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController extends VtdTableController {
  constructor(private readonly summaryService: SummaryService) {
    super(summaryService);
  }
}
