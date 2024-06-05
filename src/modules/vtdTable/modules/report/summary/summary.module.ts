import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from '@vtd/models/vtd.model';

import { Summary } from './models/summary.model';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  controllers: [SummaryController],
  providers: [SummaryService],
  imports: [SequelizeModule.forFeature([Summary, Vtd])],
})
export class SummaryModule {}
