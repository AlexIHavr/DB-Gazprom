import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { TapService } from './tap.service';

@Controller('tap')
export class TapController extends VtdTableController {
  constructor(private readonly tapService: TapService) {
    super(tapService);
  }
}
