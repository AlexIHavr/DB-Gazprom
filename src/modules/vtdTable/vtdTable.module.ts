import { Module } from '@nestjs/common';

import { AnomalyModule } from './modules/anomaly/anomaly.module';
import { BranchModule } from './modules/branch/branch.module';
import { CharacterModule } from './modules/character/character.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { MarkModule } from './modules/mark/mark.module';
import { WeldModule } from './modules/weld/weld.module';

@Module({
  imports: [AnomalyModule, CharacterModule, WeldModule, BranchModule, EquipmentModule, MarkModule],
})
export class VtdTableModule {}
