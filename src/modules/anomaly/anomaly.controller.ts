import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/common/modules/vtdTable/vtdTable.controller';

import { AnomalyService } from './anomaly.service';

@Controller('anomaly')
export class AnomalyController extends VtdTableController {
  constructor(readonly anomalyService: AnomalyService) {
    super(anomalyService);
  }
}
