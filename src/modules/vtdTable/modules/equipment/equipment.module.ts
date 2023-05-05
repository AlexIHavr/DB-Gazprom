import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { Equipment } from './models/equipment.model';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService],
  imports: [SequelizeModule.forFeature([Equipment, Vtd])],
})
export class EquipmentModule {}
