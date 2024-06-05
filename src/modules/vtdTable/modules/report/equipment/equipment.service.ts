import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from '@vtdTable/vtdTable.service';

import { Equipment } from './models/equipment.model';

@Injectable()
export class EquipmentService extends VtdTableService {
  constructor(@InjectModel(Equipment) private readonly equipmentModel: typeof Equipment) {
    super(equipmentModel);
  }
}
