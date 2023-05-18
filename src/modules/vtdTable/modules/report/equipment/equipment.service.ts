import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from 'src/modules/vtdTable/vtdTable.service';

import { Equipment } from './models/equipment.model';

@Injectable()
export class EquipmentService extends VtdTableService {
  constructor(@InjectModel(Equipment) readonly equipmentModel: typeof Equipment) {
    super(equipmentModel);
  }
}
