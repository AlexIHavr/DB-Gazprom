import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { MarkService } from './mark.service';

@Controller('mark')
export class MarkController extends VtdTableController {
  constructor(private readonly markService: MarkService) {
    super(markService);
  }
}
