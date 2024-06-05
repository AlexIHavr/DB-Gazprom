import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { WeldService } from './weld.service';

@Controller('weld')
export class WeldController extends VtdTableController {
  constructor(private readonly weldService: WeldService) {
    super(weldService);
  }
}
