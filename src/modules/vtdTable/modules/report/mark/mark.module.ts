import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from '@vtd/models/vtd.model';

import { Mark } from './models/mark.model';
import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';

@Module({
  controllers: [MarkController],
  providers: [MarkService],
  imports: [SequelizeModule.forFeature([Mark, Vtd])],
})
export class MarkModule {}
