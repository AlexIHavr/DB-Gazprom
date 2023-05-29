import { Module } from '@nestjs/common';

import { FormModule } from './modules/form/form/form.module';
import { JoiningModule } from './modules/form/joining/joining.module';
import { AnomalyModule } from './modules/report/anomaly/anomaly.module';
import { BranchModule } from './modules/report/branch/branch.module';
import { CharacterModule } from './modules/report/character/character.module';
import { EquipmentModule } from './modules/report/equipment/equipment.module';
import { MarkModule } from './modules/report/mark/mark.module';
import { SummaryModule } from './modules/report/summary/summary.module';
import { TapModule } from './modules/report/tap/tap.module';
import { WeldModule } from './modules/report/weld/weld.module';

@Module({
  imports: [
    AnomalyModule,
    CharacterModule,
    WeldModule,
    BranchModule,
    EquipmentModule,
    MarkModule,
    TapModule,
    SummaryModule,
    FormModule,
    JoiningModule,
  ],
})
export class VtdTableModule {}
