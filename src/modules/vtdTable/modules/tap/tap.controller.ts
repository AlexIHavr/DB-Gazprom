import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/modules/vtdTable/vtdTable.controller';
import { TapService } from './tap.service';

@Controller('tap')
export class TapController extends VtdTableController {
  constructor(readonly tapService: TapService) {
    super(tapService);
  }
}
