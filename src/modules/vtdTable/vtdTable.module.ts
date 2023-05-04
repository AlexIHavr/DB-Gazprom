import { Module } from '@nestjs/common';
import { AnomalyModule } from './modules/anomaly/anomaly.module';
import { BranchModule } from './modules/branch/branch.module';
import { CharacterModule } from './modules/character/character.module';
import { WeldModule } from './modules/weld/weld.module';

@Module({
  imports: [AnomalyModule, CharacterModule, WeldModule, BranchModule],
})
export class VtdTableModule {}
