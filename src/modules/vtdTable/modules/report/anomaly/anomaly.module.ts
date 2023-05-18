import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { AnomalyController } from './anomaly.controller';
import { AnomalyService } from './anomaly.service';
import { Anomaly } from './models/anomaly.model';

@Module({
  controllers: [AnomalyController],
  providers: [AnomalyService],
  imports: [SequelizeModule.forFeature([Anomaly, Vtd])],
})
export class AnomalyModule {}
