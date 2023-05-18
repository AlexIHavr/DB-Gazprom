import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/modules/vtdTable/vtdTable.controller';

import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController extends VtdTableController {
  constructor(readonly equipmentService: EquipmentService) {
    super(equipmentService);
  }
}
