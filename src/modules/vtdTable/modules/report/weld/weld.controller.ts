import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/modules/vtdTable/vtdTable.controller';

import { WeldService } from './weld.service';

@Controller('weld')
export class WeldController extends VtdTableController {
  constructor(readonly weldService: WeldService) {
    super(weldService);
  }
}
