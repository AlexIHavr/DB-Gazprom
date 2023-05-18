import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/modules/vtdTable/vtdTable.controller';

import { MarkService } from './mark.service';

@Controller('mark')
export class MarkController extends VtdTableController {
  constructor(readonly markService: MarkService) {
    super(markService);
  }
}
