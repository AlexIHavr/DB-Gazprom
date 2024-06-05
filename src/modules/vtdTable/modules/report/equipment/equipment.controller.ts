import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController extends VtdTableController {
  constructor(private readonly equipmentService: EquipmentService) {
    super(equipmentService);
  }
}
