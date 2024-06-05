import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { AnomalyService } from './anomaly.service';

@Controller('anomaly')
export class AnomalyController extends VtdTableController {
  constructor(private readonly anomalyService: AnomalyService) {
    super(anomalyService);
  }
}
