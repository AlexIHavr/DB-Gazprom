import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from '@vtd/models/vtd.model';

import { Equipment } from './models/equipment.model';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService],
  imports: [SequelizeModule.forFeature([Equipment, Vtd])],
})
export class EquipmentModule {}
